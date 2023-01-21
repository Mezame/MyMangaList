import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlButtonTonalComponent } from './button-tonal.component';

describe('ButtonTonalComponent', () => {
  let component: MmlButtonTonalComponent;
  let fixture: ComponentFixture<MmlButtonTonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlButtonTonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlButtonTonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
