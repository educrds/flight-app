import { Component, inject } from "@angular/core";
import { AirportsAutocompleteComponent } from "../../shared/components/airports-autocomplete/airports-autocomplete.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { DatepickerComponent } from "../../shared/datepicker/datepicker.component";
import { TabViewModule } from "primeng/tabview";
import { ButtonModule } from "primeng/button";
import { InputNumberModule } from "primeng/inputnumber";
import { FlightsService } from "../../core/services/flights.service";

@Component({
  selector: "flg-search-form",
  standalone: true,
  imports: [
    AirportsAutocompleteComponent,
    ReactiveFormsModule,
    DatepickerComponent,
    FormsModule,
    TabViewModule,
    ButtonModule,
    InputNumberModule,
  ],
  templateUrl: "./search-form.component.html",
  styleUrl: "./search-form.component.scss",
})
export class SearchFormComponent {
  protected searchForm!: FormGroup;

  #_fb = inject(FormBuilder);
  #_flightsService = inject(FlightsService);

  constructor() {
    this.searchForm = this.#_fb.group({
      origem: [null, Validators.required],
      destino: [null, Validators.required],
      adultos: [1, Validators.required],
      criancas: [0, Validators.required],
      dateRange: [{ partida: new Date(), retorno: new Date() }]
    });
  }

  protected changeControls(): void {
    const origemValue = this.searchForm.get("origem")?.value;
    const destinoValue = this.searchForm.get("destino")?.value;

    this.searchForm.get("origem")?.setValue(destinoValue, { emitEvent: false });
    this.searchForm.get("destino")?.setValue(origemValue, { emitEvent: false });

    this.searchForm.updateValueAndValidity();
  }

  protected searchFlights() {
    console.log(this.searchForm.getRawValue());
    this.#_flightsService.getFlights(this.searchForm.getRawValue()).subscribe({
      next: res => console.log(res),
    });
  }
}
