import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

// Páginas do painel da empresa: sem login, volta para /login
export default function RotaProtegida({ children }: { children: ReactNode }) {
  const { logado, carregando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!carregando && !logado) router.replace("/login");
  }, [carregando, logado, router]);

  if (carregando || !logado) return null;
  return <>{children}</>;
}
