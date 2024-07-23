import { Component, OnInit, forwardRef, inject } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from "@angular/forms";
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: "flg-datepicker",
  standalone: true,
  imports: [ReactiveFormsModule, CalendarModule],
  templateUrl: "./datepicker.component.html",
  styleUrls: ["./datepicker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {
  protected dateForm: FormGroup;
  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  #_fb = inject(FormBuilder);

  constructor() {
    this.dateForm = this.#_fb.group({
      date: [null],
    });
  }

  ngOnInit(): void {
    this.dateForm.valueChanges.subscribe(value => {
      if (this._onChange) {
        this._onChange(value.date);
      }
    });
  }

  writeValue(value: any): void {
    if (value) {
      this.dateForm.setValue({ date: value }, { emitEvent: false });
    } else {
      this.dateForm.reset();
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.dateForm.disable();
    } else {
      this.dateForm.enable();
    }
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.dateForm.valid ? null : { invalidForm: { valid: false, message: "Input is invalid" } };
  }
}
