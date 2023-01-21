import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlSupportingTextComponent } from './supporting-text.component';

describe('SupportingTextComponent', () => {
  let component: MmlSupportingTextComponent;
  let fixture: ComponentFixture<MmlSupportingTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlSupportingTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlSupportingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
