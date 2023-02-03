import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppChildModule } from './app-child/app-child.module';

const MODULES : any = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  AppChildModule
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
