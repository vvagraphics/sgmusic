import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitedDealCardComponent } from './limited-deal-card.component';

describe('LimitedDealCardComponent', () => {
  let component: LimitedDealCardComponent;
  let fixture: ComponentFixture<LimitedDealCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitedDealCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitedDealCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
