import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Airport } from "../models/Airport";

@Injectable({
  providedIn: "root",
})
export class AirportService {
  #envinronment = environment;
  #_http = inject(HttpClient);

  public getAirportsList$(query: string): Observable<Airport> {
    const url = `${this.#envinronment.airportsApiUrl}/suggest/${encodeURIComponent(query)}`
    return this.#_http.get<Airport>(url);
  }
}
