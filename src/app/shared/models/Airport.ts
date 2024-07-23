export type Airport = {
  type: string;
  features: Feature[];
  properties: null;
};

type Feature = {
  type: string;
  geometry: Geometry;
  properties: Properties;
};

type Properties = {
  id: number;
  country: Country;
  name: string;
  source: string;
  distance: null;
  match_relevance: MatchRelevance;
  match_level: number;
  region: Region;
  elevation: number;
  functions: string[];
  gps_code: string;
  home_link: null | string;
  iata: string;
  local_code: null | string;
  municipality: string;
  type: string;
  wikipedia: string;
};

type Region = {
  code: string;
  local_code: string;
  name: string;
  wikipedia: string;
};

type MatchRelevance = {
  code: null;
  country: null;
  levenshtein: null;
  ts_rank: number;
  trgm_similarity: null;
  skipped_chunks: number;
};

type Country = {
  code: string;
  name: string;
  continent: string;
  wikipedia: string;
};

type Geometry = {
  type: string;
  coordinates: number[];
};
