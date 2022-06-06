import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=> EmailInputComponent),
    multi: true
  }]
})
export class EmailInputComponent implements OnInit, ControlValueAccessor {

  onChange!: (value: string) => void;
  onTouche!: () => void;
  emailControl = new FormControl();

  constructor() { }

  ngOnInit(){
    this.emailControl.valueChanges.subscribe((val)=> {
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
    this.emailControl.setValue(value)
  }

}
