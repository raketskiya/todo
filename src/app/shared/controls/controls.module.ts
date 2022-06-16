import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInputComponent } from './task-input/task-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthInputComponent} from './auth-input/auth-input.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    TaskInputComponent,
    AuthInputComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbAlertModule
    ],
  exports:[
    TaskInputComponent,
    AuthInputComponent
  ]
})
export class ControlsModule { }
