import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlSelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: MmlSelectComponent;
  let fixture: ComponentFixture<MmlSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
