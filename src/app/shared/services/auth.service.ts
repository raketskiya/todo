import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import {
  catchError,
  map,
  Observable,
  of,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  FbAuthResponse,
  FbUserResponse,
} from '../../../environments/interface';
import { fbToken, fbTokenExp, userId } from '../consts/consts';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  public error$: Subject<string> = new Subject<string>();

  public isLogin: Subject<void> = new Subject();
  public fbToken: string = '';
  public fbTokenExp: string = '';
  public userId: string = '';

  constructor(private http: HttpClient) {}

  public isTokenValid(): boolean {
    return new Date() <= new Date(this.fbTokenExp);
  }

  public login(user: User): Observable<FbAuthResponse | null> {
    const body: User = {
      ...user,
      returnSecureToken: true,
    };
    return this.http
      .post<FbAuthResponse>(
        `${environment.apiURL}signInWithPassword?key=${environment.apiKey}`,
        body
      )
      .pipe(
        tap(this.setToken.bind(this)),
        catchError(this.handleAuthError.bind(this))
      );
  }

  public signUp(user: User): Observable<FbAuthResponse | null> {
    const body: User = {
      ...user,
      returnSecureToken: true,
    };
    delete body.localId;
    return this.http
      .post<FbAuthResponse>(
        `${environment.apiURL}signUp?key=${environment.apiKey}`,
        body
      )
      .pipe(
        tap(this.setToken.bind(this)),
        catchError(this.handleAuthError.bind(this))
      );
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    const { message } = error.error.error;

    enum Errors {
      INVALID_EMAIL = 'Auth.Errors.INVALID_EMAIL',
      EMAIL_NOT_FOUND = 'Auth.Errors.EMAIL_NOT_FOUND',
      INVALID_PASSWORD = 'Auth.Errors.INVALID_PASSWORD',
      EMAIL_EXISTS = 'Auth.Errors.EMAIL_EXISTS',
      MISSING_PASSWORD = 'Auth.Errors.MISSING_PASSWORD',
      ADMIN_ONLY_OPERATION = 'Auth.Errors.ADMIN_ONLY_OPERATION',
    }

    this.error$.next(Errors[message]);

    return throwError(error);
  }

  public getUserInfo(): Observable<boolean> {
    return this.http
      .post<FbUserResponse>(
        `${environment.apiURL}lookup?key=${environment.apiKey}`,
        { idToken: this.fbToken }
      )
      .pipe(
        map((el) => {
          return el.users[0].localId === this.userId;
        }),
        catchError(() => {
          this.logout();
          return of(false);
        })
      );
  }

  public logout(): void {
    this.setToken(null);
  }

  private setToken(response: FbAuthResponse | null): void {
    if (response) {
      this.fbToken = response.idToken;
      this.fbTokenExp = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      ).toString();
      this.userId = String(response.localId);

      sessionStorage.setItem(fbToken, this.fbToken);
      sessionStorage.setItem(fbTokenExp, this.fbTokenExp);
      sessionStorage.setItem(userId, this.userId);
      this.isLogin.next();
    } else {
      sessionStorage.removeItem(fbToken);
      sessionStorage.removeItem(fbTokenExp);
      sessionStorage.removeItem(userId);
      this.fbToken = this.fbTokenExp = this.userId = '';
      this.isLogin.next();
    }
  }

  ngOnDestroy(): void {
    this.error$.complete();
  }
}
