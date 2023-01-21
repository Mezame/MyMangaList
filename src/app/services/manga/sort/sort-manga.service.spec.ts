import { TestBed } from '@angular/core/testing';

import { SortMangaService } from './sort-manga.service';

describe('SortMangaService', () => {
  let service: SortMangaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortMangaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
