import "./globals.css";

import type { AppProps } from "next/app";
import { Outfit, Urbanist } from "next/font/google";
import { useRouter } from "next/router";
import LayoutAdmin from "@/components/layouts/LayoutAdmin";
import LayoutEmpresa from "@/components/layouts/painelEmpresa/LayoutEmpresa";
import RotaProtegida from "@/components/rotaProtegida";
import { AuthProvider } from "@/contexts/AuthContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";

const outfit = Outfit({
  variable: "--fonte-titulo",
  weight: ["300", "400", "500", "600", "700"],
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
  const router = useRouter();

  //* Define qual layout será chamado na página enquanto não tem o token do usuário
  const renderizarConteudo = () => {
    if (
      router.pathname.startsWith("/painelAdmin") ||
      router.pathname === "/alertas-incidentes"
    ) {
      return (
        <LayoutAdmin>
          <Component {...pageProps} />
        </LayoutAdmin>
      );
    }

    if (router.pathname.startsWith("/painelEmpresa")) {
      return (
        <RotaProtegida>
          <LayoutEmpresa>
            <Component {...pageProps} />
          </LayoutEmpresa>
        </RotaProtegida>
      );
    }

    return <Component {...pageProps} />;
  };

  return (
    <div className={`${outfit.variable} ${urbanist.variable}`}>
      <AuthProvider>
        <OnboardingProvider>{renderizarConteudo()}</OnboardingProvider>
      </AuthProvider>
    </div>
  );
}