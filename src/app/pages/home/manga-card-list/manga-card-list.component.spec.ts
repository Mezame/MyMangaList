import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaCardListComponent } from './manga-card-list.component';

describe('MangaListComponent', () => {
  let component: MangaCardListComponent;
  let fixture: ComponentFixture<MangaCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangaCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
