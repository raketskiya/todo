import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlsModule} from '../../shared/controls/controls.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth.guard';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
  ],
  imports: [
    CommonModule,
    ControlsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,

  ],
  exports: [
    SignInComponent,
    SignUpComponent,
    RouterModule
  ],
  providers:[
    AuthService, AuthGuard
  ]
})
export class AuthModule { }
