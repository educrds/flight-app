import { Component, Input, OnInit, forwardRef, inject, isSignal } from "@angular/core";
import { StatesService } from "../../services/states.service";
import { Observable, map, startWith } from "rxjs";
import { AsyncPipe } from "@angular/common";
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Regiao } from "../../models/States";
import { AutoCompleteCompleteEvent, AutoCompleteModule } from "primeng/autocomplete";

@Component({
  selector: "flg-states-autocomplete",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe, AutoCompleteModule],
  templateUrl: "./states-autocomplete.component.html",
  styleUrl: "./states-autocomplete.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatesAutocompleteComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => StatesAutocompleteComponent),
      multi: true,
    },
  ],
})
export class StatesAutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input() label: string | undefined;

  private statesService = inject(StatesService);
  private fb = inject(FormBuilder);

  protected formGroup!: FormGroup;
  protected filteredOptions: Regiao[] = [];

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.formGroup.get('stateControl')?.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      stateControl: ['']
    });

    this.statesService.getStatesList$().subscribe({
      next: res => {
        this.filteredOptions = res;
      },
    });

    this.formGroup.get('stateControl')?.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });
  }

  protected filterState(event: AutoCompleteCompleteEvent): void {
    const query = event.query.toLowerCase();
    this.filteredOptions = this.filteredOptions.filter(state =>
      state.nome.toLowerCase().includes(query) || state.mesorregiao.UF.sigla.toLowerCase().includes(query)
    );
  }

  public getConcatenatedName(state: Regiao): string {
    return `${state.nome} - ${state.mesorregiao.UF.sigla}`;
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