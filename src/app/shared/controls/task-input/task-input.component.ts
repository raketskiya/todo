import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=> TaskInputComponent),
    multi: true
  }]
})
export class TaskInputComponent implements ControlValueAccessor {
  onChange!: (value: string) => void;
  onTouche!: () => void;
  textControl = new FormControl('', [Validators.required]);


  constructor() { }

  ngOnInit(){
    this.textControl.valueChanges.subscribe((val)=> {
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
    this.textControl.setValue(value)
  }


}
