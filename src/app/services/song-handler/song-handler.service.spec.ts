import { TestBed } from '@angular/core/testing';

import { SongHandlerService } from './song-handler.service';

describe('SongHandlerService', () => {
  let service: SongHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
