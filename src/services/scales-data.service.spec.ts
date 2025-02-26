import { TestBed } from '@angular/core/testing';

import { ScalesDataService } from './scales-data.service';

describe('ScalesDataService', () => {
  let service: ScalesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScalesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
