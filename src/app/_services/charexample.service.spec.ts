import { TestBed, inject } from '@angular/core/testing';

import { CharexampleService } from './charexample.service';

describe('CharexampleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharexampleService]
    });
  });

  it('should be created', inject([CharexampleService], (service: CharexampleService) => {
    expect(service).toBeTruthy();
  }));
});
