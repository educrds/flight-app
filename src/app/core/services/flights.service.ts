/* eslint-disable no-prototype-builtins */
import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { format } from "date-fns";
import { ApiReponse } from "../../shared/models/ApiResponse";
import { Flight } from "../../models/Flight";

@Injectable({
  providedIn: "root",
})
export class FlightsService {
  #envinronment = environment;
  #_http = inject(HttpClient);

  public getFlights(searchForm: any): Observable<ApiReponse<Flight[]>> {
    const options = {
      headers: this.#envinronment.apiHeaders,
      params: this.toHttpParams(searchForm),
    };

    return this.#_http.get<ApiReponse<Flight[]>>(`${this.#envinronment.flightApiUrl}/search-roundtrip`, options);
  }

  // Função para transformar um objeto em HttpParams
  toHttpParams(searchForm: any): HttpParams {
    // remover atributos que podem ser formatados na origem
    const formFormatted: any = {
      fromEntityId: searchForm.origem.skyId,
      toEntityId: searchForm.destino.skyId,
      departDate: format(new Date(searchForm.date[0]), "yyyy-MM-dd"),
      returnDate: format(new Date(searchForm.date[1]), 'yyyy-MM-dd'),
      market: "BR",
      locale: "pt-BR",
      currency: "BRL",
      adults: searchForm.adultos,
      children: searchForm.criancas,
    };
    return Object.keys(formFormatted).reduce((params, key) => {
      return params.set(key, formFormatted[key]);
    }, new HttpParams());
  }
}
