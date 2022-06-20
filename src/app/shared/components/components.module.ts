import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class ComponentsModule {}
