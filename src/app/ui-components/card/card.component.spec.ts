import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmlCardComponent } from './card.component';

describe('CardComponent', () => {
  let component: MmlCardComponent;
  let fixture: ComponentFixture<MmlCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MmlCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmlCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
