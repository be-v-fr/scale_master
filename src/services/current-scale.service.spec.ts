import { TestBed } from '@angular/core/testing';

import { CurrentScaleService } from './current-scale.service';

describe('CurrentScaleService', () => {
  let service: CurrentScaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentScaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
