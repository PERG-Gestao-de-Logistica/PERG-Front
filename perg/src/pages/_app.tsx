import "@/styles/globals.css";
import "@/styles/componentes.css";
import "@/styles/home.css";
import "@/styles/rastreio.css";
import "@/styles/acompanhamento.css";
import "@/styles/entregue.css";
import "@/styles/alertas-incidentes.css";
import type { AppProps } from "next/app";
import { Outfit, Urbanist } from "next/font/google";

const outfit = Outfit({
  variable: "--font-texto",
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-titulo",
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${outfit.variable} ${urbanist.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}