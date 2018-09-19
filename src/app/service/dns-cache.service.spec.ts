import { TestBed, inject } from '@angular/core/testing';

import { DnsCacheService } from './dns-cache.service';

describe('DnsCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DnsCacheService]
    });
  });

  it('should be created', inject([DnsCacheService], (service: DnsCacheService) => {
    expect(service).toBeTruthy();
  }));
});
