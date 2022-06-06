import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TasksModule} from './modules/tasks/tasks.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthModule} from './modules/auth/auth.module';
import {ComponentsModule} from './shared/components/components.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TasksModule,
    BrowserAnimationsModule,
    AuthModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
