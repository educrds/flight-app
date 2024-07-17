import { Component, inject } from "@angular/core";
import { StatesAutocompleteComponent } from "../../shared/components/states-autocomplete/states-autocomplete.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { DatepickerComponent } from "../../shared/datepicker/datepicker.component";
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: "flg-search-form",
  standalone: true,
  imports: [
    StatesAutocompleteComponent,
    ReactiveFormsModule,
    DatepickerComponent,
    FormsModule,
    TabViewModule,
    ButtonModule,
    InputNumberModule
  ],
  templateUrl: "./search-form.component.html",
  styleUrl: "./search-form.component.scss",
})
export class SearchFormComponent {
  protected searchForm!: FormGroup;

  #_fb = inject(FormBuilder);

  constructor() {
    this.searchForm = this.#_fb.group({
      origem: [null, Validators.required],
      destino: [null, Validators.required],
      adultos: [1, Validators.required],
      criancas: [0, Validators.required],
      dateRange: [{ start: new Date(), end: new Date() }],
      dates: [
        {
          partida: [null],
          retorno: [null],
        },
      ],
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
  }
}
