import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

import { MmlTopAppBarComponent } from '@components/top-app-bar/top-app-bar.component';
import { MmlIconButtonComponent } from '@components/icon-button/icon-button.component';
import { MmlButtonElevatedComponent } from '@components/button/button-elevated/button-elevated.component';
import { MmlSelectComponent } from '@components/select/select.component';
import { MmlCardComponent } from '@components/card/card.component';
import { MmlIconComponent } from '@components/icon/icon.component';
import { MmlDialogComponent } from '@components/dialog/dialog.component';
import { MmlTextFieldComponent } from '@components/text-field/text-field.component';
import { MmlLabelComponent } from '@components/label/label.component';
import { MmlSupportingTextComponent } from '@components/supporting-text/supporting-text.component';
import { MmlTextAreaComponent } from '@components/text-area/text-area.component';
import { MmlButtonTextComponent } from '@components/button/button-text/button-text.component';
import { MmlButtonFillComponent } from '@components/button/button-fill/button-fill.component';
import { MangaCardListComponent } from './manga-card-list/manga-card-list.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { MmlAlertComponent } from '@components/alert/alert.component';
import { AddMangaDialogComponent } from './add-manga-dialog/add-manga-dialog.component';
import { EditMangaDialogComponent } from './edit-manga-dialog/edit-manga-dialog.component';




@NgModule({
  declarations: [
    HomePage,
    MangaCardListComponent,
    WrapperComponent,
    AddMangaDialogComponent,
    EditMangaDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MmlTopAppBarComponent,
    MmlIconButtonComponent,
    MmlButtonElevatedComponent,
    MmlIconComponent,
    MmlSelectComponent,
    MmlCardComponent,
    MmlDialogComponent,
    MmlTextFieldComponent,
    MmlLabelComponent,
    MmlSupportingTextComponent,
    MmlTextAreaComponent,
    MmlButtonTextComponent,
    MmlButtonFillComponent,
    MmlAlertComponent
  ]
})
export class HomeModule { }
