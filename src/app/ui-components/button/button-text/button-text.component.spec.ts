import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlButtonTextComponent } from './button-text.component';

describe('ButtonTextComponent', () => {
  let component: MmlButtonTextComponent;
  let fixture: ComponentFixture<MmlButtonTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlButtonTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlButtonTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
