import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlIconButtonComponent } from './icon-button.component';

describe('IconButtonComponent', () => {
  let component: MmlIconButtonComponent;
  let fixture: ComponentFixture<MmlIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlIconButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
