import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAndPodcastComponent } from './blog-and-podcast.component';

describe('BlogAndPodcastComponent', () => {
  let component: BlogAndPodcastComponent;
  let fixture: ComponentFixture<BlogAndPodcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogAndPodcastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogAndPodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
