import { api } from "./api";
import type { Origem, PontoMapa, SalvarOrigem } from "@/@types/origem";

type RespostaOrigem = { mensagem: string; origem: Origem };

export const origensService = {
  listar: () => api.get<Origem[]>("/api/Origens"),
  criar: (dados: SalvarOrigem) => api.post<RespostaOrigem>("/api/Origens", dados),
  atualizar: (id: string, dados: SalvarOrigem) => api.put<RespostaOrigem>(`/api/Origens/${id}`, dados),
  definirPadrao: (id: string) => api.patch<RespostaOrigem>(`/api/Origens/${id}/padrao`),

  // Endereço -> ponto no mapa (antes de salvar). latitude/longitude vêm null se não achar.
  localizar: (endereco: { cep: string; logradouro: string; numero: string; bairro: string; cidade: string; uf: string }) =>
    api.post<{ status: string; latitude: number | null; longitude: number | null }>("/api/Origens/localizar", endereco)
      .then((r): PontoMapa | null =>
        r.latitude != null && r.longitude != null ? { latitude: r.latitude, longitude: r.longitude } : null,
      ),
};
