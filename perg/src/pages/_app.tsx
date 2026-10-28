import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Outfit, Urbanist } from "next/font/google";

const outfit = Outfit({
  variable: "--font-titulo",
  weight: ["600"],
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-texto",
  weight: ["300", "400"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return(
    <main className={outfit.variable}>
    <Component {...pageProps} />
    </main>
  ) 
}