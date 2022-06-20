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
import {
  adminOnlyOperation,
  emailExists,
  emailNotFound,
  fbToken,
  fbTokenExp,
  invalidEmail,
  invalidPassword,
  missingPassword,
  userId,
  weakPassword,
  weakPasswordKey,
} from '../consts/consts';

@Injectable()
export class AuthService implements OnDestroy {
  public error$: Subject<string> = new Subject<string>();

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

    const errors: any = {
      INVALID_EMAIL: invalidEmail,
      EMAIL_NOT_FOUND: emailNotFound,
      INVALID_PASSWORD: invalidPassword,
      EMAIL_EXISTS: emailExists,
      [weakPasswordKey]: weakPassword,
      MISSING_PASSWORD: missingPassword,
      ADMIN_ONLY_OPERATION: adminOnlyOperation,
    };

    this.error$.next(errors[message]);

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

      localStorage.setItem(fbToken, this.fbToken);
      localStorage.setItem(fbTokenExp, this.fbTokenExp);
      localStorage.setItem(userId, this.userId);
    } else {
      localStorage.removeItem(fbToken);
      localStorage.removeItem(fbTokenExp);
      localStorage.removeItem(userId);
      this.fbToken = this.fbTokenExp = this.userId = '';
    }
  }

  ngOnDestroy(): void {
    this.error$.complete();
  }
}
