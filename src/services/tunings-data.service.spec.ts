import { TestBed } from '@angular/core/testing';

import { TuningsDataService } from './tunings-data.service';

describe('TuningsDataService', () => {
  let service: TuningsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TuningsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
