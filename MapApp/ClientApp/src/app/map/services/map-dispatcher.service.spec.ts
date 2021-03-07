import { TestBed } from '@angular/core/testing';

import { MapDispatcherService } from './map-dispatcher.service';

describe('MapDispatcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapDispatcherService = TestBed.get(MapDispatcherService);
    expect(service).toBeTruthy();
  });
});
