import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import {ControlsModule} from '../../shared/controls/controls.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth.guard';
import {AuthInputComponent} from '../../shared/controls/auth-input/auth-input.component';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    ControlsModule,
    ReactiveFormsModule,
    SharedModule,

  ],
  exports: [
    AuthComponent,
    RouterModule
  ],
  providers:[
    AuthService, AuthGuard
  ]
})
export class AuthModule { }
