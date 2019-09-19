import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core';
import { MaterialModule } from './shared';

import {
  LoginModule,
  RegisterModule,
  DashboardModule
} from './modules';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    AppRoutingModule,
    LoginModule,
    RegisterModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
