import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlButtonFillComponent } from './button-fill.component';

describe('ButtonFillComponent', () => {
  let component: MmlButtonFillComponent;
  let fixture: ComponentFixture<MmlButtonFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlButtonFillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlButtonFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
