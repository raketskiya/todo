import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=> AuthInputComponent),
    multi: true
  }]
})
export class AuthInputComponent implements OnInit, ControlValueAccessor {

  onChange!: (value: string) => void;
  onTouche!: () => void;
  authControl = new FormControl(null);
  @Input() place = '';
  @Input() type = '';
  constructor() { }

  ngOnInit(){
    this.authControl.valueChanges.subscribe((val)=> {
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
    this.authControl.setValue(value)
  }

}
