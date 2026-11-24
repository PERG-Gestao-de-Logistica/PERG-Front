import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Mapa da página de rastreio: o local da entrega e, quando houver, o entregador.
// Carregado só no navegador (o Leaflet não roda no servidor): use com next/dynamic e ssr: false.

export interface Ponto {
  latitude: number;
  longitude: number;
}

const iconeDestino = L.icon({
  iconUrl: "/assets/images/endereco-icone.png",
  iconSize: [36, 36],
  iconAnchor: [18, 34],
});

const iconeEntregador = L.divIcon({
  className: "",
  html: `<div style="width:40px;height:40px;border-radius:50%;background:#03bfb5;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center"><img src="/assets/images/entregador.png" alt="" style="width:22px;height:22px" /></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Enquadra os pontos sempre que mudam
function Enquadrar({ pontos }: { pontos: Ponto[] }) {
  const mapa = useMap();
  useEffect(() => {
    if (pontos.length === 1) {
      mapa.setView([pontos[0].latitude, pontos[0].longitude], 16);
    } else if (pontos.length > 1) {
      mapa.fitBounds(
        L.latLngBounds(pontos.map((p) => [p.latitude, p.longitude] as [number, number])),
        { padding: [50, 50], maxZoom: 16 },
      );
    }
  }, [mapa, pontos]);
  return null;
}

export default function MapaRastreio({ destino, entregador }: { destino: Ponto; entregador: Ponto | null }) {
  const pontos = entregador ? [destino, entregador] : [destino];

  return (
    <MapContainer
      center={[destino.latitude, destino.longitude]}
      zoom={16}
      scrollWheelZoom={false}
      style={{ position: "absolute", inset: 0, zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[destino.latitude, destino.longitude]} icon={iconeDestino} />
      {entregador && <Marker position={[entregador.latitude, entregador.longitude]} icon={iconeEntregador} />}
      <Enquadrar pontos={pontos} />
    </MapContainer>
  );
}
