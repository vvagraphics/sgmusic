import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicEventConcertPromotionComponent } from './music-event-concert-promotion.component';

describe('MusicEventConcertPromotionComponent', () => {
  let component: MusicEventConcertPromotionComponent;
  let fixture: ComponentFixture<MusicEventConcertPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicEventConcertPromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicEventConcertPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
