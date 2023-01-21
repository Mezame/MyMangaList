import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { of } from 'rxjs';
import { LoginModule } from './login.module';

import { LoginPage } from './login.page';

describe('LoginComponent', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let el: DebugElement;
  let textField: DebugElement;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [
        LoginModule
      ],
      declarations: [LoginPage],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents()

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();

    textField = el.query(By.css('[mml-text-field]'));

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authService.login.and.returnValue(of({ id: 1, username: 'Mezame' }));
    authService.isLoggedIn = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService and try to login', () => {

    textField.nativeElement.value = 'pass';

    textField.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));

    expect(authService.login).toHaveBeenCalled();

  });

  it('should call navigateByUrl when login successfully', () => {

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    textField.nativeElement.value = 'pass';

    textField.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));

    expect(router.navigateByUrl).toHaveBeenCalled();

  });

  it('should show a message when password is not correct', () => {

    const supportingText = el.query(By.css('mml-supporting-text'));

    authService.isLoggedIn = false;    

    textField.nativeElement.value = 'pass';

    textField.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));

    fixture.detectChanges();

    expect(supportingText.nativeElement.innerText).toEqual('The password is not correct.');

    expect(supportingText.classes['error'])
      .withContext('has error')
      .toBe(true);

  });

});
