import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { editRedirectGuard } from './edit-redirect.guard';

describe('editRedirectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => editRedirectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
