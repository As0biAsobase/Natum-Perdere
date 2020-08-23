import { TestBed } from '@angular/core/testing';

import { BanroomService } from './banroom.service';

describe('BanroomService', () => {
  let service: BanroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
