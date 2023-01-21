import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MangaStoreService } from './manga-store.service';

describe('MangaStoreService', () => {
  let service: MangaStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MangaStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
