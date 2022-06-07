import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/user.interface';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FbAuthResponse, FbUserResponse} from '../../../environments/interface';

@Injectable()
export class AuthService{
  constructor(private  http: HttpClient) {}

  get token(): string | null {
    const expDate = new Date(Number(localStorage.getItem('fb-token-exp')))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<FbAuthResponse | null> {
    const body:User = {
      ...user,
      returnSecureToken: true
    }
    return this.http.post<FbAuthResponse>(`${environment.apiURL}signInWithPassword?key=${environment.apiKey}`, body)
      .pipe(
        tap(this.setToken)
      );
  }

  signUp(user: User): Observable<FbAuthResponse | null> {
    const body:User = {
      ...user,
      returnSecureToken: true
    }
    delete body.localId;
    console.log(body)
    return this.http.post<FbAuthResponse>(`${environment.apiURL}signUp?key=${environment.apiKey}`, body)
      .pipe(
        tap(this.setToken)
      );
  }

  getUserInfo(){
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
          localStorage.clear()
          return of(false);
        })
      );
  }




  logout(): void{
    this.setToken(null)
  }

  isAuthenticated(): boolean{
    return !!this.token;
  }

  private setToken( response: FbAuthResponse | null ) {
    if(response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('userId', String(response.localId))
    } else {
      localStorage.clear();
    }


  }
}
