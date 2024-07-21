export type Airport = {
  iata: string;
  icao: string;
  name: string;
  location: string;
  time: string;
  id: string;
  skyId: string;
};

export type AirportResponse = {
  data: Airport[];
  message: string;
  status: boolean;
};
