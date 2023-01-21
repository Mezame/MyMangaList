import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlLabelComponent } from './label.component';

describe('LabelComponent', () => {
  let component: MmlLabelComponent;
  let fixture: ComponentFixture<MmlLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
