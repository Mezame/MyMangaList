import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alert } from '@components/alert/alert';
import { User } from '@models/user';
import { AlertsService } from '@services/alert/alerts.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthStoreService } from './store/auth-store.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private authStoreService: AuthStoreService,
    private alertsService: AlertsService) {

  }

  apiUrl = '/api/v1/auth/';

  isLoggedIn = false;

  redirectUrl: string | null = '';

  login(username: string, password: string): Observable<User> {

    const data = { username, password }

    return this.http.post<User>(this.apiUrl + 'login', data, this.httpOptions)
      .pipe(
        tap(user => {

          this.isLoggedIn = true;

          this.authStoreService.setUser(user);

        }),
        catchError(this.handleError<User>('AuthService', 'login'))
      );

  }

  logout(): Observable<any> {

    return this.http.post<any>(this.apiUrl + 'logout', null, this.httpOptions)
      .pipe(
        tap(_ => {

          this.isLoggedIn = false;

          this.authStoreService.removeUser();

        }),
        catchError(this.handleError<any>('AuthService', 'logout'))
      );

  }

  handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {

      let alert: Alert = {
        type: 'error',
        message: 'Something has happened, so you will be logged out.'
      }

      console.error(error);

      if (error.error instanceof Event) {
        throw error.error;
      }

      if (operation == 'login') {

        //throw new Error(`${operation} failed`);

      }

      if (operation == 'logout') {

        this.alertsService.showAlert(alert);

        throw new Error(`${operation} failed`);

      }

      return of(result);

    };

  }

}
