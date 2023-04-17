import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteYourLessonsComponent } from './promote-your-lessons.component';

describe('PromoteYourLessonsComponent', () => {
  let component: PromoteYourLessonsComponent;
  let fixture: ComponentFixture<PromoteYourLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoteYourLessonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoteYourLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
