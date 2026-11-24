import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import type { CadastroEmpresa } from "@/@types/autenticacao";

// Guarda o que cada etapa do cadastro preencheu (sobrevive a recarregar a página).
// Só a última etapa envia tudo para a API, com montarCadastro().

const CHAVE = "perg_onboarding";

export interface DadosOnboarding {
  conta?: { nome: string; email: string; telefone: string; senha: string; aceitouTermos: boolean };
  empresa?: { cnpj: string; razaoSocial: string; nomeFantasia: string; segmento: CadastroEmpresa["segmento"]; faixaPedidosDia: string };
  operacao?: { entregas: string[]; canais: string[]; veiculos: string[] };
}

export interface PontoColeta {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  abre: string;
  fecha: string;
}

interface OnboardingContextData {
  dados: DadosOnboarding;
  salvar: (parte: Partial<DadosOnboarding>) => void;
  limpar: () => void;
  montarCadastro: (ponto: PontoColeta) => CadastroEmpresa;
}

const OnboardingContext = createContext<OnboardingContextData>({} as OnboardingContextData);

const somenteDigitos = (v: string) => v.replace(/\D/g, "");
const comSegundos = (hora: string) => (hora.length === 5 ? `${hora}:00` : hora);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [dados, setDados] = useState<DadosOnboarding>({});

  useEffect(() => {
    try {
      const salvo = sessionStorage.getItem(CHAVE);
      if (salvo) setDados(JSON.parse(salvo));
    } catch {}
  }, []);

  const salvar = (parte: Partial<DadosOnboarding>) => {
    setDados((atual) => {
      const novo = { ...atual, ...parte };
      sessionStorage.setItem(CHAVE, JSON.stringify(novo));
      return novo;
    });
  };

  const limpar = () => {
    sessionStorage.removeItem(CHAVE);
    setDados({});
  };

  // Os ids das opções são os da tela de operação (mesmo-dia, site, moto...)
  const montarCadastro = (ponto: PontoColeta): CadastroEmpresa => {
    const { conta, empresa, operacao } = dados;
    if (!conta || !empresa || !operacao) throw new Error("Volte e preencha as etapas anteriores.");
    const tem = (lista: string[], id: string) => lista.includes(id);
    return {
      cnpj: somenteDigitos(empresa.cnpj),
      razaoSocial: empresa.razaoSocial,
      nomeFantasia: empresa.nomeFantasia,
      email: conta.email,
      telefone: somenteDigitos(conta.telefone) || undefined,
      segmento: empresa.segmento,
      faixaPedidosDia: empresa.faixaPedidosDia,
      entregaMesmoDia: tem(operacao.entregas, "mesmo-dia"),
      entregaAgendada: tem(operacao.entregas, "agendada"),
      retiradaLoja: tem(operacao.entregas, "retirada"),
      vendeSiteProprio: tem(operacao.canais, "site"),
      vendeWhatsapp: tem(operacao.canais, "whatsapp"),
      vendeShopify: tem(operacao.canais, "shopify"),
      usaCarro: tem(operacao.veiculos, "carro"),
      usaMoto: tem(operacao.veiculos, "moto"),
      usaVanCaminhao: tem(operacao.veiculos, "van-caminhao"),
      responsavel: {
        nome: conta.nome,
        email: conta.email,
        telefone: somenteDigitos(conta.telefone) || undefined,
        senha: conta.senha,
        aceitouTermos: conta.aceitouTermos,
      },
      endereco: {
        ...ponto,
        cep: somenteDigitos(ponto.cep),
        complemento: ponto.complemento || undefined,
        abre: comSegundos(ponto.abre),
        fecha: comSegundos(ponto.fecha),
        // A tela não pergunta: a loja ajusta depois em Configurações > Origens
        abreSabado: false,
        abreDomingo: false,
      },
    };
  };

  return (
    <OnboardingContext.Provider value={{ dados, salvar, limpar, montarCadastro }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext);
