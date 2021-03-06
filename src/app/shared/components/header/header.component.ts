import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { fbToken, fbTokenExp, userId } from '../../consts/consts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    public auth: AuthService,
    public translate: TranslateService,
    private ref: ChangeDetectorRef
  ) {}

  public language: string = 'ru';

  public languages: string[] = ['en', 'ru'];

  private ngUnsubscribe: Subject<void> = new Subject();

  ngOnInit(): void {
    if (sessionStorage.getItem(fbToken)) {
      this.auth.fbToken = String(sessionStorage.getItem(fbToken));
      this.auth.fbTokenExp = String(sessionStorage.getItem(fbTokenExp));
      this.auth.userId = String(sessionStorage.getItem(userId));
    }

    this.auth.isLogin.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.ref.markForCheck();
    });
  }

  public theme(): void {
    this.router.navigate(['tasks/theme']);
    this.auth.isLogin.next();
  }

  public logOut(): void {
    this.auth.logout();
    this.router.navigate(['signIn']);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
