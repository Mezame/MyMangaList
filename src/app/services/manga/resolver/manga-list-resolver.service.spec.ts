import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MangaListResolverService } from './manga-list-resolver.service';

describe('MangaListResolverService', () => {
  let service: MangaListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MangaListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
