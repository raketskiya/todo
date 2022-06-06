import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInputComponent } from './task-input/task-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EmailInputComponent } from './email-input/email-input.component';
import { PasswordInputComponent } from './password-input/password-input.component';



@NgModule({
  declarations: [
    TaskInputComponent,
    EmailInputComponent,
    PasswordInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TaskInputComponent,
    EmailInputComponent,
    PasswordInputComponent
  ]
})
export class ControlsModule { }
