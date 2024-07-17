export type Regiao = {
  id: number;
  nome: string;
  mesorregiao: Mesorregiao;
}

type Mesorregiao = {
  id: number;
  nome: string;
  UF: UF;
}

type UF = {
  id: number;
  sigla: string;
  nome: string;
  regiao: RegiaoUF;
}

type RegiaoUF = {
  id: number;
  sigla: string;
  nome: string;
}