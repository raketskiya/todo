import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AuthInputComponent } from './auth-input/auth-input.component';
import { TaskInputComponent } from './task-input/task-input.component';

@NgModule({
  declarations: [TaskInputComponent, AuthInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    MatInputModule,
    MatIconModule,
    TranslateModule,
  ],
  exports: [TaskInputComponent, AuthInputComponent],
})
export class ControlsModule {}
