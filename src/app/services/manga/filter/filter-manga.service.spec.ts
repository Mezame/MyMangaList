import { TestBed } from '@angular/core/testing';

import { FilterMangaService } from './filter-manga.service';

describe('FilterMangaService', () => {
  let service: FilterMangaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterMangaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
