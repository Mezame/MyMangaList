import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlDialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: MmlDialogComponent;
  let fixture: ComponentFixture<MmlDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
