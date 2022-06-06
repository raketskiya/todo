import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInputComponent } from './task-input/task-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PasswordInputComponent} from './password-input/password-input.component';
import {EmailInputComponent} from './email-input/email-input.component';



@NgModule({
  declarations: [
    TaskInputComponent,
    PasswordInputComponent,
    EmailInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    TaskInputComponent,
    PasswordInputComponent,
    EmailInputComponent
  ]
})
export class ControlsModule { }
