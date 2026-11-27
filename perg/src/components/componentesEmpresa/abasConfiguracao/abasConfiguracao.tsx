import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { TbBuildingSkyscraper, TbBuildingWarehouse, TbId, TbLock, TbUsers } from "react-icons/tb";
import type { IconType } from "react-icons";
import { useAuth } from "@/hooks/useAuth";
import styles from "./abasConfiguracao.module.css";

interface Aba {
  rota: string;
  nome: string;
  Icone: IconType;
  somenteAdmin: boolean;
  emBreve?: boolean;
}

const ABAS: Aba[] = [
  { rota: "/painelEmpresa/configuracao/perfil", nome: "Perfil", Icone: TbUsers, somenteAdmin: false },
//   { rota: "/painelEmpresa/configuracao/entregadores", nome: "Entregadores", Icone: TbId, somenteAdmin: true, emBreve: true },
  { rota: "/painelEmpresa/configuracao/origens", nome: "Origens", Icone: TbBuildingWarehouse, somenteAdmin: true },
  { rota: "/painelEmpresa/configuracao/empresas", nome: "Empresas", Icone: TbBuildingSkyscraper, somenteAdmin: true },
];

// Barra de abas das Configurações. Funcionário só tem "Perfil", então a barra nem aparece para ele.
// "acao" é um botão da aba aberta, mostrado à direita da barra (ex.: Adicionar origem).
export default function AbasConfiguracao({ acao }: { acao?: ReactNode }) {
  const router = useRouter();
  const { usuario } = useAuth();
//   if (!usuario || usuario.papel !== "Admin") return null;

  const abas = (
    <nav className={styles.abas} aria-label="Seções das configurações">
      {ABAS.map(({ rota, nome, Icone, emBreve }) => {
        const ativa = router.pathname === rota;
        if (emBreve) {
          return (
            <span key={rota} className={`${styles.aba} ${styles.abaEmBreve}`} title="Em breve" aria-disabled="true">
              <Icone className={styles.icone} aria-hidden="true" />
              {nome}
              <small className={styles.selo}>em breve</small>
            </span>
          );
        }
        return (
          <Link
            key={rota}
            href={rota}
            className={`${styles.aba} ${ativa ? styles.abaAtiva : ""}`}
            aria-current={ativa ? "page" : undefined}
          >
            <Icone className={styles.icone} aria-hidden="true" />
            {nome}
          </Link>
        );
      })}
    </nav>
  );

  if (!acao) return abas;
  return (
    <div className={styles.linha}>
      {abas}
      {acao}
    </div>
  );
}

// Envolve as abas de admin: funcionário que abrir a URL direto vê um aviso no lugar da tela
export function SomenteAdmin({ children }: { children: ReactNode }) {
  const { usuario } = useAuth();
  if (!usuario) return null;
  if (usuario.papel === "Admin") return <>{children}</>;

  return (
    <section className={styles.semAcesso}>
      <TbLock className={styles.iconeSemAcesso} aria-hidden="true" />
      <h2>Área do administrador</h2>
      <p>Só o administrador da empresa pode ver e alterar esta seção.</p>
      <Link href="/painelEmpresa/configuracao/perfil" className={styles.linkPerfil}>
        Ir para o perfil
      </Link>
    </section>
  );
}