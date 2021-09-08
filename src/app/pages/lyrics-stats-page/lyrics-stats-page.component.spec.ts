import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsStatsPageComponent } from './lyrics-stats-page.component';

describe('LyricsStatsPageComponent', () => {
  let component: LyricsStatsPageComponent;
  let fixture: ComponentFixture<LyricsStatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LyricsStatsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LyricsStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
