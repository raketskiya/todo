import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import {ControlsModule} from '../../shared/controls/controls.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ControlsModule,
    ReactiveFormsModule
  ],
  providers:[
    AuthService
  ]
})
export class AuthModule { }
