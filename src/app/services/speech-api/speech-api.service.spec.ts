import { TestBed } from '@angular/core/testing';

import { SpeechApiService } from './speech-api.service';

describe('SpeechApiService', () => {
  let service: SpeechApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeechApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
