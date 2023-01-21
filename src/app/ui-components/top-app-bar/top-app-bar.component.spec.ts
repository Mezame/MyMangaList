import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlTopAppBarComponent } from './top-app-bar.component';

describe('TopAppBarComponent', () => {
  let component: MmlTopAppBarComponent;
  let fixture: ComponentFixture<MmlTopAppBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlTopAppBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlTopAppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
