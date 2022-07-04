import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { fbToken, fbTokenExp, userId } from '../../consts/consts';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    public auth: AuthService,
    public translate: TranslateService
  ) {}

  public language: string = 'en';

  ngOnInit(): void {
    if (sessionStorage.getItem(fbToken)) {
      this.auth.fbToken = String(sessionStorage.getItem(fbToken));
      this.auth.fbTokenExp = String(sessionStorage.getItem(fbTokenExp));
      this.auth.userId = String(sessionStorage.getItem(userId));
    }
  }

  public changeLanguage() {
    this.language === 'en' ? (this.language = 'ru') : (this.language = 'en');
    this.translate.use(this.language);
  }

  public logOut(): void {
    this.auth.logout();
    this.router.navigate(['signIn']);
  }
}
