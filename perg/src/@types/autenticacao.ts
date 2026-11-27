export type PapelUsuario = "Admin" | "Funcionario";

export interface UsuarioLogado {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  papel: PapelUsuario;
  trocarSenha: boolean;
  notifOcorrencias: boolean;
  notifCobranca: boolean;
  googleVinculado: boolean;
  empresaId: string;
  nomeEmpresa: string;
}

export interface RespostaLogin {
  mensagem: string;
  token: string;
  trocarSenha: boolean;
}

export type SegmentoEmpresa =
  | "Alimentacao"
  | "MercadoConveniencia"
  | "FarmaciaSaude"
  | "ModaAcessorios"
  | "EletronicosInformatica"
  | "CasaConstrucao"
  | "PetShop"
  | "Outros";

export const SEGMENTOS: { valor: SegmentoEmpresa; rotulo: string }[] = [
  { valor: "Alimentacao", rotulo: "Alimentação" },
  { valor: "MercadoConveniencia", rotulo: "Mercado e conveniência" },
  { valor: "FarmaciaSaude", rotulo: "Farmácia e saúde" },
  { valor: "ModaAcessorios", rotulo: "Moda e acessórios" },
  { valor: "EletronicosInformatica", rotulo: "Eletrônicos e informática" },
  { valor: "CasaConstrucao", rotulo: "Casa e construção" },
  { valor: "PetShop", rotulo: "Pet shop" },
  { valor: "Outros", rotulo: "Outros" },
];

// Corpo de POST /api/Empresas/cadastrar (as 4 telas do onboarding juntas)
export interface CadastroEmpresa {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
  telefone?: string;
  segmento: SegmentoEmpresa;
  faixaPedidosDia: string;
  entregaMesmoDia: boolean;
  entregaAgendada: boolean;
  retiradaLoja: boolean;
  vendeSiteProprio: boolean;
  vendeWhatsapp: boolean;
  vendeShopify: boolean;
  usaCarro: boolean;
  usaMoto: boolean;
  usaVanCaminhao: boolean;
  responsavel: {
    nome: string;
    email: string;
    telefone?: string;
    senha: string;
    aceitouTermos: boolean;
  };
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
    abre: string;
    fecha: string;
    abreSabado: boolean;
    abreDomingo: boolean;
  };
}