import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=> PasswordInputComponent),
    multi: true
  }]
})
export class PasswordInputComponent implements OnInit, ControlValueAccessor {
  @Input() place = 'Пароль'
  passwordControl = new FormControl();
  onChange!: (value: string) => void;
  onTouche!: () => void;

  constructor() { }

  ngOnInit(){
    this.passwordControl.valueChanges.subscribe((val)=> {
      if(this.onChange) {
        this.onChange(val)
      }
    })
  }

  setDisabledState(isDisabled: boolean): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouche = fn;
  }

  writeValue(value:string): void {
    this.passwordControl.setValue(value)
  }
}
