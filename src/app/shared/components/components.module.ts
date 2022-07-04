import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeComponent } from './theme/theme.component';

@NgModule({
  imports: [CommonModule, TranslateModule, MatIconModule, MatButtonModule],
  exports: [HeaderComponent, ThemeComponent],
  declarations: [HeaderComponent, ThemeComponent],
})
export class ComponentsModule {}
