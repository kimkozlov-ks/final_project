import { TestBed } from '@angular/core/testing';

import { AuthStatisticService } from './auth-statistic.service';

describe('AuthStatisticServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthStatisticService = TestBed.get(AuthStatisticService);
    expect(service).toBeTruthy();
  });
});
