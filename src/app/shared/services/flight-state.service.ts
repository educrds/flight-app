import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Flight } from "../../models/Flight";

@Injectable({
  providedIn: "root",
})
export class FlightStateService {
  private flightList: BehaviorSubject<Flight[]> = new BehaviorSubject<Flight[]>([]);

  public flightListObservable$: Observable<Flight[]> = this.flightList.asObservable();

  public storeFlightList(flight: Flight[]) {
    if (flight) {
      this.flightList.next(flight);
    }
  }
}
