import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, TranslateModule, MatIconModule, MatButtonModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class ComponentsModule {}
