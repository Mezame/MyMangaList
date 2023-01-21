import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { User } from '@models/user';
import { HttpResponse } from '@angular/common/http';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('#login', () => {
    let username: string;
    let password: string;
    let expectedUser: User;

    beforeEach(() => {
      username = 'Mezame';
      password = 'pass';
    });

    it('should login and return user and set isLoggedIn true', () => {
      expectedUser = { id: 1, username }

      authService.login(username, password).subscribe({
        next: user => {
          expect(user)
            .withContext('should return user')
            .toEqual(expectedUser);
          expect(authService.isLoggedIn)
            .withContext('should be true')
            .toBe(true);
        }
      });

      const req = httpTestingController.expectOne('/api/v1/auth/login');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ username, password });

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: expectedUser });
      req.event(expectedResponse);

    });

    it('should return error message', () => {
      const msg = 'login failed';

      authService.login(username, password).subscribe({
        next: user => expect(user).not.toContain(username),
        error: error => expect(error.message).toContain(msg)
      });

      const req = httpTestingController.expectOne('/api/v1/auth/login');

      req.flush(msg, { status: 403, statusText: 'Forbiden' });
    });

  });

  describe('#logout', () => {

    it('should logout and and set isLoggedIn false', () => {

      authService.logout().subscribe({
        next: _ => expect(authService.isLoggedIn)
          .withContext('should be true')
          .toBe(false)
      });

      const req = httpTestingController.expectOne('/api/v1/auth/logout');
      expect(req.request.method).toEqual('POST');

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: { message: 'OK' } });
      req.event(expectedResponse);

    });

    it('should return error message', () => {
      const msg = 'logout failed';

      authService.logout().subscribe({
        next: _ => fail('expected to fail'),
        error: error => expect(error.message).toContain(msg)
      });

      const req = httpTestingController.expectOne('/api/v1/auth/logout');

      req.flush(msg, { status: 403, statusText: 'Forbidden' });
    });

  });

});
