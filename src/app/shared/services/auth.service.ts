import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../interfaces/user.interface';
import {catchError, map, Observable, of, Subject, tap, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FbAuthResponse, FbUserResponse} from '../../../environments/interface';

@Injectable()
export class AuthService implements OnDestroy{

  public error$: Subject<string> = new Subject<string>();

  constructor(private  http: HttpClient) {}

  get token(): string | null {
    const expDate = new Date(Number(localStorage.getItem('fb-token-exp')))
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<FbAuthResponse | null> {
    const body:User = {
      ...user,
      returnSecureToken: true
    }
    return this.http.post<FbAuthResponse>(`${environment.apiURL}signInWithPassword?key=${environment.apiKey}`, body)
      .pipe(
        tap(AuthService.setToken),
        catchError(this.handleAuthError.bind(this))
      );
  }

  signUp(user: User): Observable<FbAuthResponse | null> {
    const body:User = {
      ...user,
      returnSecureToken: true
    }
    delete body.localId;
    return this.http.post<FbAuthResponse>(`${environment.apiURL}signUp?key=${environment.apiKey}`, body)
      .pipe(
        tap(AuthService.setToken),
        catchError(this.handleAuthError.bind(this))
      );
  }

  handleAuthError(error: HttpErrorResponse): Observable<never> {
    const {message} = error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
      case 'EMAIL_EXISTS':
        this.error$.next('Email exists');
        break;
      case 'WEAK_PASSWORD : Password should be at least 6 characters':
        this.error$.next('Weak password');
        break;
      case 'MISSING_PASSWORD':
        this.error$.next('Missing password');
        break;
    }
    return throwError(error)
  }

  getUserInfo(): Observable<boolean> {
    const token = localStorage.getItem('fb-token');
    return this.http.post<FbUserResponse>(`${environment.apiURL}lookup?key=${environment.apiKey}`, {idToken: token})
      .pipe(
        map(el => {
          if(el.users[0].localId == localStorage.getItem('userId')){
            return true;
          } else {
            return false;
          }
        }),
        catchError(() => {
          localStorage.clear();
          return of(false);
        })
      );
  }

  logout(): void {
    AuthService.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private static setToken(response: FbAuthResponse | null ): void {
    if(response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('userId', String(response.localId))
    } else {
      localStorage.clear();
    }
  }

  ngOnDestroy(): void {
    this.error$.unsubscribe();
  }
}
