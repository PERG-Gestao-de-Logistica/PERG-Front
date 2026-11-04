
import "./globals.css";

import type { AppProps } from "next/app";
import { Outfit, Urbanist } from "next/font/google";

const outfit = Outfit({
  variable: "--fonte-titulo",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const urbanist = Urbanist({
  variable: "--fonte-texto",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${outfit.variable} ${urbanist.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
