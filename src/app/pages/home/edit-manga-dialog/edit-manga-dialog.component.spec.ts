import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { EditMangaDialogComponent } from './edit-manga-dialog.component';

describe('EditMangaDialogComponent', () => {
  let component: EditMangaDialogComponent;
  let fixture: ComponentFixture<EditMangaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EditMangaDialogComponent],
      providers: [FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditMangaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
