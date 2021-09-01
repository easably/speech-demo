import { TestBed } from '@angular/core/testing';

import { SongProgressService } from './song-progress.service';

describe('SongProgressService', () => {
  let service: SongProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
