import { TestBed, inject } from '@angular/core/testing';

import { MyServiceListService } from './my-service-list.service';

describe('MyServiceListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyServiceListService]
    });
  });

  it('should be created', inject([MyServiceListService], (service: MyServiceListService) => {
    expect(service).toBeTruthy();
  }));
});
