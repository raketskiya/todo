import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {AuthService} from '../services/auth.service';


@NgModule({
  imports: [],
  exports: [HeaderComponent],
  declarations: [
    HeaderComponent
  ],
})
export class ComponentsModule{

}
