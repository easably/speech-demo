import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongGameEndComponent } from './song-game-end.component';

describe('SongGameEndComponent', () => {
  let component: SongGameEndComponent;
  let fixture: ComponentFixture<SongGameEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongGameEndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongGameEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
