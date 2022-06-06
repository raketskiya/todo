import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import {ControlsModule} from '../../shared/controls/controls.module';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    ControlsModule
  ],
  exports: [
    AuthComponent
  ],
})
export class AuthModule { }
