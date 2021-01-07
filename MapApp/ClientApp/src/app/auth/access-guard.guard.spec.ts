import { TestBed, async, inject } from '@angular/core/testing';

import { AccessGuard } from './access-guard.guard';

describe('AccessGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessGuard]
    });
  });

  it('should ...', inject([AccessGuard], (guard: AccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
