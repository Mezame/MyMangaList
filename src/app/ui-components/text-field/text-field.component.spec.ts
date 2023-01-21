import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlTextFieldComponent } from './text-field.component';

describe('TextFieldComponent', () => {
  let component: MmlTextFieldComponent;
  let fixture: ComponentFixture<MmlTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlTextFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
