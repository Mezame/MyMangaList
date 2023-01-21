import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlIconComponent } from './icon.component';

describe('MmlIconComponent', () => {
  let component: MmlIconComponent;
  let fixture: ComponentFixture<MmlIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
