import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongProgressComponent } from './song-progress.component';

describe('SongProgressComponent', () => {
  let component: SongProgressComponent;
  let fixture: ComponentFixture<SongProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
