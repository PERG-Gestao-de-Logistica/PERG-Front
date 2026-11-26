"use client";

import { Fragment, useMemo } from "react";
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
import { FaStore } from "react-icons/fa";
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
}

interface MapaRoteirizacaoProps {
  rotas: RotaGerada[];
  rotaSelecionadaId: string | null;
}

const CENTRO: [number, number] = [-23.5614, -46.6559];

function BotaoCentralizarMapa({
  rotaAtiva,
}: {
  rotaAtiva: RotaGerada | undefined;
}) {
  const map = useMap();

  function handleCentralizar() {
    if (rotaAtiva && rotaAtiva.coordenadas.length > 1) {
      const bounds = L.latLngBounds(rotaAtiva.coordenadas);
      map.flyToBounds(bounds, { padding: [50, 50], duration: 0.8 });
    } else {
      map.flyTo(CENTRO, 13, { duration: 0.8 });
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
          : "Centralizar no CD Aurora"
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
}: MapaRoteirizacaoProps) {
  const rotaAtiva = rotas.find((r) => r.id === rotaSelecionadaId);

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
      center={CENTRO}
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

      <BotaoCentralizarMapa rotaAtiva={rotaAtiva} />

      <Marker position={CENTRO} icon={iconeLoja}>
        <Popup>
          <span className={styles.popupTitulo}>CD Aurora</span>
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
            {rota.coordenadas
              .filter((_, idx) => idx > 0 && idx % 2 === 0)
              .map((coord, idx) => (
                <CircleMarker
                  key={`${rota.id}-ponto-${idx}`}
                  center={coord}
                  radius={5}
                  pathOptions={{
                    color: rota.cor,
                    weight: 2,
                    fillColor: "#ffffff",
                    fillOpacity: destacada ? 1 : 0.3,
                    opacity: destacada ? 1 : 0.3,
                  }}
                >
                  <Popup>
                    <span className={styles.popupTitulo}>
                      {rota.codigo} · Parada {idx + 1}
                    </span>
                    <span className={styles.popupTexto}>{rota.motorista}</span>
                  </Popup>
                </CircleMarker>
              ))}
          </Fragment>
        );
      })}
    </MapContainer>
  );
}