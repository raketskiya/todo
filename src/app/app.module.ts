import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TasksModule} from './modules/tasks/tasks.module';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthModule} from './modules/auth/auth.module';
import {ComponentsModule} from './shared/components/components.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './shared/interceptors/auth.interceptor';
import {MatDialogModule} from '@angular/material/dialog';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
}

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
    ComponentsModule,
    MatDialogModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
