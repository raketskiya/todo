import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from '../../shared/controls/controls.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SignUpComponent, SignInComponent],
  imports: [
    CommonModule,
    ControlsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    NgbAlertModule,
  ],
  exports: [SignInComponent, SignUpComponent, RouterModule],
  providers: [AuthGuard],
})
export class AuthModule {}
