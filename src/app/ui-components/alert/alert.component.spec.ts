import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlAlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: MmlAlertComponent;
  let fixture: ComponentFixture<MmlAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
