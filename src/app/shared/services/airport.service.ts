import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiReponse } from "../models/ApiResponse";
import { Airport } from "../models/Airport";

@Injectable({
  providedIn: "root",
})
export class AirportService {
  private airportListCache$?: Observable<ApiReponse<Airport[]>>;

  #envinronment = environment;
  #_http = inject(HttpClient);

  #headerParams = {
    headers: this.#envinronment.apiHeaders
  };

  public getAirportsList$(): Observable<ApiReponse<Airport[]>> {
    if (!this.airportListCache$) {
      this.airportListCache$ = this.requestAirportsList().pipe(shareReplay(1));
    }
    return this.airportListCache$;
  }

  private requestAirportsList(): Observable<ApiReponse<Airport[]>> {
    return this.#_http.get<ApiReponse<Airport[]>>(`${this.#envinronment.flightApiUrl}/airports`, this.#headerParams);
  }
}
