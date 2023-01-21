import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { MmlRoutingModule } from './mml-routing.module';
import { MmlComponent } from './mml.component';

@NgModule({
  declarations: [
    MmlComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'x-xsrf-token'
    }),
    MmlRoutingModule
  ],
  providers: [],
  bootstrap: [MmlComponent]
})
export class MmlModule { }
