import { TestBed, inject } from '@angular/core/testing';

import { DumpService } from './dump.service';

describe('DumpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DumpService]
    });
  });

  it('should be created', inject([DumpService], (service: DumpService) => {
    expect(service).toBeTruthy();
  }));
});
