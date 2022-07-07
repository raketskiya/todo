import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TaskInputComponent),
      multi: true,
    },
  ],
})
export class TaskInputComponent implements ControlValueAccessor, OnInit {
  onChange!: (value: string) => void;
  onTouche!: () => void;
  public textControl = new FormControl('');

  constructor() {}

  ngOnInit(): void {
    this.textControl.valueChanges.subscribe((val) => {
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
    this.textControl.setValue(value);
  }
}
