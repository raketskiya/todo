import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.getUserInfo().pipe(
      tap((val) => {
        if (!val) {
          this.auth.logout();
          this.router.navigate(['signIn']);
          return false;
        }
        return true;
      })
    );
  }
}
