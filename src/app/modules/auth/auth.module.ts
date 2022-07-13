import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { SharedModule } from '../../shared/shared.module';
import { ControlsModule } from '../../shared/controls/controls.module';

@NgModule({
  declarations: [SignUpComponent, SignInComponent],
  imports: [
    CommonModule,
    ControlsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    NgbAlertModule,
    TranslateModule,
    MatButtonModule,
  ],
  exports: [SignInComponent, SignUpComponent, RouterModule],
  providers: [AuthGuard],
})
export class AuthModule {}
