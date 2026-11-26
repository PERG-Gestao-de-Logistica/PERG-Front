"use client";

import { Fragment, useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { MdMyLocation } from "react-icons/md";
import { FaMotorcycle, FaStore } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import styles from "./mapaRoteirizacao.module.css";

export interface RotaGerada {
  id: string;
  codigo: string;
  motorista: string;
  regiao: string;
  paradas: number;
  distancia: string;
  tempo: string;
  veiculo: "moto" | "carro" | "caminhao" | "bicicleta";
  cor: string;
  coordenadas: [number, number][];
  // Paradas reais da rota (vindas da API); sem elas, usa pontos da própria linha
  pontosParadas?: [number, number][];
}

// Ponto de partida das rotas (origem padrão da loja)
export interface OrigemMapa {
  nome: string;
  latitude: number;
  longitude: number;
}

// Entregador ao vivo no mapa (monitoramento)
export interface EntregadorMapa {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
  cor: string;
}

interface MapaRoteirizacaoProps {
  rotas: RotaGerada[];
  rotaSelecionadaId: string | null;
  origem?: OrigemMapa | null;
  entregadores?: EntregadorMapa[];
}

const CENTRO_PADRAO: [number, number] = [-23.5614, -46.6559];

// Enquadra todas as rotas quando a lista muda; com uma rota selecionada, vai até ela
function Enquadrar({
  rotas,
  rotaAtiva,
  centro,
}: {
  rotas: RotaGerada[];
  rotaAtiva: RotaGerada | undefined;
  centro: [number, number];
}) {
  const map = useMap();
  const chaveRotas = rotas.map((r) => r.id).join(",");

  useEffect(() => {
    const pontos = (rotaAtiva ? [rotaAtiva] : rotas).flatMap((r) => r.coordenadas);
    if (pontos.length > 1) {
      map.fitBounds(L.latLngBounds([...pontos, centro]), { padding: [40, 40], maxZoom: 16 });
    } else {
      map.setView(centro, 13);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, chaveRotas, rotaAtiva?.id, centro[0], centro[1]]);

  return null;
}

function BotaoCentralizarMapa({
  rotaAtiva,
  centro,
  nomeOrigem,
}: {
  rotaAtiva: RotaGerada | undefined;
  centro: [number, number];
  nomeOrigem: string;
}) {
  const map = useMap();

  function handleCentralizar() {
    if (rotaAtiva && rotaAtiva.coordenadas.length > 1) {
      const bounds = L.latLngBounds(rotaAtiva.coordenadas);
      map.flyToBounds(bounds, { padding: [50, 50], duration: 0.8 });
    } else {
      map.flyTo(centro, 13, { duration: 0.8 });
    }
  }

  return (
    <button
      type="button"
      onClick={handleCentralizar}
      className={styles.botaoCentralizarMapa}
      title={
        rotaAtiva
          ? `Centralizar na rota ${rotaAtiva.codigo}`
          : `Centralizar em ${nomeOrigem}`
      }
      aria-label="Centralizar mapa"
    >
      <MdMyLocation size={18} aria-hidden="true" />
    </button>
  );
}

export default function MapaRoteirizacao({
  rotas,
  rotaSelecionadaId,
  origem,
  entregadores = [],
}: MapaRoteirizacaoProps) {
  const rotaAtiva = rotas.find((r) => r.id === rotaSelecionadaId);
  const centro: [number, number] = origem ? [origem.latitude, origem.longitude] : CENTRO_PADRAO;
  const nomeOrigem = origem?.nome ?? "Ponto de partida";

  const iconeLoja = useMemo(
    () =>
      L.divIcon({
        className: styles.marcadorLoja,
        html: renderToStaticMarkup(<FaStore size={18} aria-hidden="true" />),
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      }),
    []
  );

  return (
    <MapContainer
      center={centro}
      zoom={13}
      className={styles.mapaContainer}
      zoomControl={false}
    >
      <ZoomControl position="topright" />

      <TileLayer
        attribution="&copy; Google Maps"
        url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        maxZoom={20}
        className={styles.tilesMapa}
      />

      <BotaoCentralizarMapa rotaAtiva={rotaAtiva} centro={centro} nomeOrigem={nomeOrigem} />
      <Enquadrar rotas={rotas} rotaAtiva={rotaAtiva} centro={centro} />

      <Marker position={centro} icon={iconeLoja}>
        <Popup>
          <span className={styles.popupTitulo}>{nomeOrigem}</span>
          <span className={styles.popupTexto}>Ponto de partida</span>
        </Popup>
      </Marker>

      {rotas.map((rota) => {
        const destacada = !rotaSelecionadaId || rotaSelecionadaId === rota.id;

        return (
          <Fragment key={rota.id}>
            <Polyline
              positions={rota.coordenadas}
              pathOptions={{
                color: rota.cor,
                weight: rotaSelecionadaId === rota.id ? 6 : 4,
                opacity: destacada ? 0.95 : 0.25,
                lineJoin: "round",
                lineCap: "round",
              }}
            />

            {/* * Exibição dos marcadores nos pontos de parada */}
            {(rota.pontosParadas ?? rota.coordenadas.filter((_, idx) => idx > 0 && idx % 2 === 0))
              .map((coord, idx, lista) => {
                // A rota termina na última entrega (o entregador é autônomo e não volta para a loja):
                // esse ponto fica preenchido e maior
                const ultima = idx === lista.length - 1;
                return (
                  <CircleMarker
                    key={`${rota.id}-ponto-${idx}`}
                    center={coord}
                    radius={ultima ? 7 : 5}
                    pathOptions={{
                      color: rota.cor,
                      weight: 2,
                      fillColor: ultima ? rota.cor : "#ffffff",
                      fillOpacity: destacada ? 1 : 0.3,
                      opacity: destacada ? 1 : 0.3,
                    }}
                  >
                    <Popup>
                      <span className={styles.popupTitulo}>
                        {rota.codigo} · {ultima ? "Última entrega (fim da rota)" : `Parada ${idx + 1}`}
                      </span>
                      <span className={styles.popupTexto}>{rota.motorista}</span>
                    </Popup>
                  </CircleMarker>
                );
              })}
          </Fragment>
        );
      })}

      {/* * Entregadores ao vivo (monitoramento) */}
      {entregadores.map((e) => (
        <Marker
          key={e.id}
          position={[e.latitude, e.longitude]}
          icon={L.divIcon({
            className: "",
            html: `<div style="width:34px;height:34px;border-radius:50%;background:${e.cor};border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;color:#fff">${renderToStaticMarkup(<FaMotorcycle size={16} aria-hidden="true" />)}</div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
          })}
          zIndexOffset={1000}
        >
          <Popup>
            <span className={styles.popupTitulo}>{e.nome}</span>
            <span className={styles.popupTexto}>Posição ao vivo</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}