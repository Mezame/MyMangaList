import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlButtonElevatedComponent } from './button-elevated.component';

describe('ButtonComponent', () => {
  let component: MmlButtonElevatedComponent;
  let fixture: ComponentFixture<MmlButtonElevatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlButtonElevatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlButtonElevatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
