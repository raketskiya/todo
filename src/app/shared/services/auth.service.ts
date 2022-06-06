import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/user.interface';
import {Observable, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FbAuthResponse} from '../../../environments/interface';

@Injectable()
export class AuthService{
  constructor(private  http: HttpClient) {}

  get token(): string | null {

    // @ts-ignore
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
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

    return this.http.post<FbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, body)
      .pipe(
        tap(this.setToken)
      );
  }

  logout(): void{
    this.setToken(null)
  }

  isAuthenticated(): boolean{
    return !!this.token;
  }

  private setToken( response: FbAuthResponse | null ) {
    if(response !== null) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }


  }
}
