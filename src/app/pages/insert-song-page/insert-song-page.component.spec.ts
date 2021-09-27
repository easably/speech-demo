import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSongPageComponent } from './insert-song-page.component';

describe('InsertSongPageComponent', () => {
  let component: InsertSongPageComponent;
  let fixture: ComponentFixture<InsertSongPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertSongPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertSongPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
