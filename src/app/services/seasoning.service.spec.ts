import { TestBed } from '@angular/core/testing';

import { SeasoningService } from './seasoning.service';

describe('SeasoningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeasoningService = TestBed.get(SeasoningService);
    expect(service).toBeTruthy();
  });
});
