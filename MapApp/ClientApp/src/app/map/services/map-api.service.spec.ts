import { TestBed } from '@angular/core/testing';

import { MapApiService } from './map-api.service';

describe('MapApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapApiService = TestBed.get(MapApiService);
    expect(service).toBeTruthy();
  });
});
