import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {CommonModule} from '@angular/common';
import { AuthErrorDialogComponent } from './auth-error-dialog/auth-error-dialog.component';


@NgModule({
  imports: [CommonModule],
  exports: [HeaderComponent],
  declarations: [
    HeaderComponent,
    AuthErrorDialogComponent
  ],
})
export class ComponentsModule{

}
