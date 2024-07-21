import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { environment } from "../../../environments/environment";
import { AirportResponse } from "../models/Airport";

@Injectable({
  providedIn: "root",
})
export class AirportService {
  private airportListCache$?: Observable<AirportResponse>;

  #envinronment = environment;
  #_http = inject(HttpClient);

  #headerParams = {
    headers: this.#envinronment.apiHeaders
  };

  public getStatesList$(): Observable<AirportResponse> {
    if (!this.airportListCache$) {
      this.airportListCache$ = this.requestAirportsList().pipe(shareReplay(1));
    }
    return this.airportListCache$;
  }

  private requestAirportsList(): Observable<AirportResponse> {
    return this.#_http.get<AirportResponse>(`${this.#envinronment.flightApiUrl}/airports`, this.#headerParams);
  }
}
