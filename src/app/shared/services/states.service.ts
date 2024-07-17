import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, retry, shareReplay } from "rxjs";
import { environment } from "../../../environments/environment";
import { Regiao } from "../models/States";

@Injectable({
  providedIn: "root",
})
export class StatesService {
  #envinronment = environment;
  #_http = inject(HttpClient);

  public getStatesList$(): Observable<Regiao[]> {
    return this.#_http.get<Regiao[]>(this.#envinronment.statesApiUrl).pipe(retry(1), shareReplay(1));
  }
}
