import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricAnalysisCardComponent } from './lyric-analysis-card.component';

describe('LyricAnalysisCardComponent', () => {
  let component: LyricAnalysisCardComponent;
  let fixture: ComponentFixture<LyricAnalysisCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LyricAnalysisCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LyricAnalysisCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
