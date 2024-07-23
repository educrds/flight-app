import { Component, inject, OnInit } from "@angular/core";
import { FlightStateService } from "../../shared/services/flight-state.service";

@Component({
  selector: "flg-flight-list",
  standalone: true,
  imports: [],
  templateUrl: "./flight-list.component.html",
  styleUrl: "./flight-list.component.scss",
})
export class FlightListComponent implements OnInit {
  #__flightStateService = inject(FlightStateService);

  ngOnInit(): void {
    this.#__flightStateService.flightListObservable$.subscribe({
      next: res => console.table(res),
    });
  }
}
