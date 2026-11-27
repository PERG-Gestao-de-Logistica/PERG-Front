import { useEffect } from "react";
import { LayersControl, MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { PontoMapa } from "@/@types/origem";

// Mapa do modal de origem: mostra o ponto e deixa arrastar para ajustar.
// Carregado só no navegador (o Leaflet não roda no servidor): use com next/dynamic e ssr: false.

const CENTRO_SP: [number, number] = [-23.5505, -46.6333];

// Pino no estilo da tela: círculo verde com a loja no meio
const iconeOrigem = L.divIcon({
  className: "",
  html: `<div style="width:64px;height:64px;border-radius:50%;background:rgba(3,191,181,.22);border:2px solid #03bfb5;display:flex;align-items:center;justify-content:center">
    <div style="width:30px;height:30px;border-radius:50%;background:#004146;display:flex;align-items:center;justify-content:center">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4"/><path d="M5 21V10.85"/><path d="M19 21V10.85"/><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>
    </div>
  </div>`,
  iconSize: [64, 64],
  iconAnchor: [32, 32],
});

// Dentro do modal o mapa nasce antes de a caixa ter o tamanho final, e o Leaflet calcula os
// quadradinhos com a medida errada (fica cortado e fora do centro). Aqui ele remede a caixa
// sempre que ela muda de tamanho e antes de centralizar no ponto.
function AjustarTamanho() {
  const mapa = useMap();
  useEffect(() => {
    const caixa = mapa.getContainer();
    const observador = new ResizeObserver(() => mapa.invalidateSize());
    observador.observe(caixa);
    const primeiraMedida = setTimeout(() => mapa.invalidateSize(), 200);
    return () => {
      observador.disconnect();
      clearTimeout(primeiraMedida);
    };
  }, [mapa]);
  return null;
}

function Centralizar({ ponto }: { ponto: PontoMapa | null }) {
  const mapa = useMap();
  useEffect(() => {
    if (!ponto) return;
    mapa.invalidateSize();
    mapa.setView([ponto.latitude, ponto.longitude], Math.max(mapa.getZoom(), 16), { animate: false });
  }, [mapa, ponto]);
  return null;
}

interface MapaOrigemProps {
  ponto: PontoMapa | null;
  onMover: (ponto: PontoMapa) => void;
}

export default function MapaOrigem({ ponto, onMover }: MapaOrigemProps) {
  return (
    <MapContainer
      center={ponto ? [ponto.latitude, ponto.longitude] : CENTRO_SP}
      zoom={ponto ? 16 : 11}
      scrollWheelZoom={false}
      style={{ position: "absolute", inset: 0, zIndex: 1 }}
    >
      {/* Seletor de fundo no canto do mapa. As camadas do Google usam a URL direta dos
          quadradinhos (fora da API oficial): serve para a demonstração acadêmica; num produto
          real, trocar pela API oficial (com chave) ou ficar só com o OpenStreetMap. */}
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Google">
          <TileLayer
            attribution="&copy; Google"
            url="https://mt{s}.google.com/vt/lyrs=m&hl=pt-BR&x={x}&y={y}&z={z}"
            subdomains={["0", "1", "2", "3"]}
            maxZoom={20}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google Satélite">
          <TileLayer
            attribution="&copy; Google"
            url="https://mt{s}.google.com/vt/lyrs=y&hl=pt-BR&x={x}&y={y}&z={z}"
            subdomains={["0", "1", "2", "3"]}
            maxZoom={20}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      {ponto && (
        <Marker
          position={[ponto.latitude, ponto.longitude]}
          icon={iconeOrigem}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const { lat, lng } = (e.target as L.Marker).getLatLng();
              onMover({ latitude: lat, longitude: lng });
            },
          }}
        />
      )}
      <AjustarTamanho />
      <Centralizar ponto={ponto} />
    </MapContainer>
  );
}