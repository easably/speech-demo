import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongTitleComponent } from './song-title.component';

describe('SongTitleComponent', () => {
  let component: SongTitleComponent;
  let fixture: ComponentFixture<SongTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
