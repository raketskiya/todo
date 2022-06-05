import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInputComponent } from './task-input/task-input.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    TaskInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    TaskInputComponent
  ]
})
export class ControlsModule { }
