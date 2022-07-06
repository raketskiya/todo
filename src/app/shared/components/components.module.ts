import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeComponent } from './theme/theme.component';
import { BreadcrumbModule } from 'angular-crumbs';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    BreadcrumbModule,
    RouterModule,
  ],
  exports: [HeaderComponent, ThemeComponent, BreadcrumbsComponent],
  declarations: [HeaderComponent, ThemeComponent, BreadcrumbsComponent],
})
export class ComponentsModule {}
