import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { AddMangaDialogComponent } from './add-manga-dialog.component';

describe('AddMangaDialogComponent', () => {
  let component: AddMangaDialogComponent;
  let fixture: ComponentFixture<AddMangaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMangaDialogComponent ],
      providers: [FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMangaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
