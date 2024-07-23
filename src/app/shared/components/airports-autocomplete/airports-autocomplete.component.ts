import { Component, Input, OnInit, forwardRef, inject } from "@angular/core";
import { AirportService } from "../../services/airport.service";
import { AsyncPipe } from "@angular/common";
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from "@angular/forms";
import { Airport } from "../../models/Airport";
import { AutoCompleteModule, AutoCompleteSelectEvent } from "primeng/autocomplete";
import { catchError, debounceTime, distinctUntilChanged, filter, map, Observable, of, switchMap } from "rxjs";

@Component({
  selector: "flg-airports-autocomplete",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe, AutoCompleteModule],
  templateUrl: "./airports-autocomplete.component.html",
  styleUrl: "./airports-autocomplete.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AirportsAutocompleteComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AirportsAutocompleteComponent),
      multi: true,
    },
  ],
})
export class AirportsAutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input() label: string | undefined;

  private statesService = inject(AirportService);
  private fb = inject(FormBuilder);

  protected airportGroup!: FormGroup;
  protected filteredOptions: Airport[] = [];

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.airportGroup.get("airport")?.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.airportGroup = this.fb.group({
      airport: [null],
    });

    this.airportGroup
      .get("airport")
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((res) => res.length > 3),
        switchMap(query => this._getStatesList(query))
      )
      .subscribe(filteredOptions => this.filteredOptions = filteredOptions.map((res: any) => res.properties )
    );
  }

  private _getStatesList(query: string): Observable<any> {
    return this.statesService.getAirportsList$(query).pipe(
      map(res => {
        return res.features.filter(airport => {
          if (airport.properties.iata !== undefined) {
            return (
              airport.properties.name.toLowerCase().includes(query.toLowerCase()) ||
              airport.properties.municipality.toLowerCase().includes(query.toLowerCase())
            );
          }
          return false;
        });
      }),
      catchError(() => of([])) // Handle errors gracefully
    );
  }

  protected onSelectAirport(event: AutoCompleteSelectEvent) {
    this.onChange(event.value.iata);
    this.onTouched();
  }

  /**
   * Validates the control.
   * @param control - The control to validate.
   * @returns A validation result, or null if the control is valid.
   */
  public validate(control: AbstractControl): ValidationErrors | null {
    return control.valid ? null : { invalidForm: { valid: false, message: "Input is invalid" } };
  }
}
