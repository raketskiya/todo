import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbModule } from 'angular-crumbs';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ThemeComponent } from './theme/theme.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    BreadcrumbModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: [HeaderComponent, ThemeComponent, BreadcrumbsComponent],
  declarations: [HeaderComponent, ThemeComponent, BreadcrumbsComponent],
})
export class ComponentsModule {}
