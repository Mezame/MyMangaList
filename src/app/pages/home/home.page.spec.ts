import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { mangaMock } from '@mocks/manga';
import { AuthService } from '@services/auth/auth.service';
import { AddMangaService } from '@services/manga/daves/add-manga.service';
import { DeleteMangaService } from '@services/manga/daves/delete-manga.service';
import { EditMangaService } from '@services/manga/daves/edit-manga.service';
import { ViewMangaService } from '@services/manga/daves/view-manga.service';
import { MangaStoreService } from '@services/manga/store/manga-store.service';
import { BehaviorSubject, of } from 'rxjs';
import { HomeModule } from './home.module';

import { HomePage } from './home.page';

describe('HomeComponent', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let el: DebugElement;
  let mangaStoreService: jasmine.SpyObj<MangaStoreService>;
  let route: jasmine.SpyObj<any>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {

    const mangaStoreServiceSpy = jasmine.createSpyObj('MangaStoreService', ['viewAllManga']);
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [
        HomeModule,
        RouterTestingModule
      ],
      declarations: [HomePage],
      providers: [
        { provide: ViewMangaService, useValue: {} },
        { provide: MangaStoreService, useValue: mangaStoreServiceSpy },
        { provide: AddMangaService, useValue: {} },
        { provide: EditMangaService, useValue: {} },
        { provide: DeleteMangaService, useValue: {} },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: routeSpy }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    mangaStoreService = TestBed.inject(MangaStoreService) as jasmine.SpyObj<MangaStoreService>;
    mangaStoreService.viewAllManga.and.returnValue(new BehaviorSubject(mangaMock));

    route = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<any>;
    route.snapshot = {
      paramMap: convertToParamMap({ mangaByStatus: 'all' }),
      data: { manga: mangaMock }
    };

    fixture.detectChanges();

    router = TestBed.inject(Router);

  });

  it('should create HomePage', () => {
    expect(component).toBeTruthy();
  });

  it('should try to logout when icon button is clicked', () => {

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authService.logout.and.returnValue(of({ message: 'logged out' }));

    const iconButton = el.query(By.css('mml-icon-button'));

    iconButton.nativeElement.click();

    expect(authService.logout).toHaveBeenCalled();

  });

  it('should navigate to Login Page when logout is successfuly', () => {

    const navigateSpy = spyOn(router, 'navigate');

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authService.logout.and.returnValue(of({ message: 'logged out' }));

    const iconButton = el.query(By.css('mml-icon-button'));

    iconButton.nativeElement.click();

    expect(navigateSpy).toHaveBeenCalledWith(['login']);

  });

  it('should render tab list equal to manga status avaliable', () => {

    const tabList = el.query(By.css('.tab-list'));

    const mangaStatusAvaliableCount = component.mangaStatusAvaliable.length;

    expect(tabList.children.length)
      .withContext('tab items count')
      .toEqual(mangaStatusAvaliableCount);

  });

});
