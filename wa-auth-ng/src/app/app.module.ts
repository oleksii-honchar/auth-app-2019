import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core';
import { SharedModule } from './shared';

import {
  SignInModule,
  SignUpModule,
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
    HttpClientModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    SignInModule,
    SignUpModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
