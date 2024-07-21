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
import { AutoCompleteCompleteEvent, AutoCompleteModule } from "primeng/autocomplete";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  scan,
  shareReplay,
  switchMap,
} from "rxjs";

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

  protected formGroup!: FormGroup;
  protected filteredOptions: Airport[] = [];

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.formGroup.get("stateControl")?.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      stateControl: [""],
    });

    this.formGroup
      .get("stateControl")
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(query => query.length > 3),
        switchMap(query => {
          return this._getStatesList(query);
        })
      )
      .subscribe(filteredOptions => {
        this.filteredOptions = filteredOptions;
        this.onChange(filteredOptions[0]);
        this.onTouched();
      });
  }

  private _getStatesList(query: string): Observable<Airport[]> {
    return this.statesService.getStatesList$().pipe(
      map(res => {
        return res.data.filter(
          airport => airport.name.toLowerCase().includes(query.toLowerCase()) || airport.location.toLowerCase().includes(query.toLowerCase())
        );
      }),
      catchError(() => of([])) // Handle errors gracefully
    );
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
