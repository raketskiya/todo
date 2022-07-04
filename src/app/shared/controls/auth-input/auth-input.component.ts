import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthInputComponent),
      multi: true,
    },
  ],
})
export class AuthInputComponent implements OnInit, ControlValueAccessor {
  onChange!: (value: string) => void;
  onTouche!: () => void;

  public hide: boolean = true;

  public authControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(40),
  ]);

  @Input() place = '';
  @Input() type = '';

  constructor() {}

  ngOnInit(): void {
    this.authControl.valueChanges.subscribe((val) => {
      if (this.onChange) {
        this.onChange(val);
      }
    });
  }

  public setDisabledState(isDisabled: boolean): void {}

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouche = fn;
  }

  public writeValue(value: string): void {
    this.authControl.setValue(value);
  }
}
