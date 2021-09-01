import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongLineComponent } from './song-line.component';

describe('SongLineComponent', () => {
  let component: SongLineComponent;
  let fixture: ComponentFixture<SongLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
