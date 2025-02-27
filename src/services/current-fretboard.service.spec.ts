import { TestBed } from '@angular/core/testing';

import { CurrentFretboardService } from './current-fretboard.service';

describe('CurrentFretboardService', () => {
  let service: CurrentFretboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentFretboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
