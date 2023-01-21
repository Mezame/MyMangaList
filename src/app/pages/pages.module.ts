import { NgModule } from '@angular/core';

import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';



@NgModule({
    imports: [
        HomeModule,
        LoginModule,
        PageNotFoundModule
    ],
    exports: [
        HomeModule,
        LoginModule,
        PageNotFoundModule
    ],
    declarations: [
    ]
})
export class PagesModule { }