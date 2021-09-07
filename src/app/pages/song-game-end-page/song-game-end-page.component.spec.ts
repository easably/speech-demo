import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongGameEndPageComponent } from './song-game-end-page.component';

describe('SongGameEndPageComponent', () => {
  let component: SongGameEndPageComponent;
  let fixture: ComponentFixture<SongGameEndPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongGameEndPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongGameEndPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
