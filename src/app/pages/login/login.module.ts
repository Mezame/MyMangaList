import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

import { MmlTextFieldComponent } from '@components/text-field/text-field.component';
import { MmlSupportingTextComponent } from '@components/supporting-text/supporting-text.component';


@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MmlTextFieldComponent,
    MmlSupportingTextComponent
  ]
})
export class LoginModule { }
