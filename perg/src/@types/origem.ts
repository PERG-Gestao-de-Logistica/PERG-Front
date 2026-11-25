export type TipoOrigem = "Loja" | "Deposito";

// GET /api/Origens (horários vêm como "08:00:00"; dias: 0 domingo ... 6 sábado)
export interface Origem {
  id: string;
  nome: string;
  tipo: TipoOrigem;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  uf: string;
  latitude: number | null;
  longitude: number | null;
  responsavelNome: string | null;
  responsavelTelefone: string | null;
  abre: string;
  fecha: string;
  dias: number[];
  instrucoesColeta: string | null;
  padrao: boolean;
}

// Corpo de POST /api/Origens e PUT /api/Origens/{id}
export interface SalvarOrigem {
  nome: string;
  tipo: TipoOrigem;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  latitude?: number;
  longitude?: number;
  responsavelNome?: string;
  responsavelTelefone?: string;
  abre: string;
  fecha: string;
  dias: number[];
  instrucoesColeta?: string;
  padrao: boolean;
}

export interface PontoMapa {
  latitude: number;
  longitude: number;
}
