import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlTextAreaComponent } from './text-area.component';

describe('TextAreaComponent', () => {
  let component: MmlTextAreaComponent;
  let fixture: ComponentFixture<MmlTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlTextAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
