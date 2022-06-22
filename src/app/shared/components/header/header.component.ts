import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { fbToken, fbTokenExp, userId } from '../../consts/consts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    if (sessionStorage.getItem(fbToken)) {
      this.auth.fbToken = String(sessionStorage.getItem(fbToken));
      this.auth.fbTokenExp = String(sessionStorage.getItem(fbTokenExp));
      this.auth.userId = String(sessionStorage.getItem(userId));
    }
  }

  logOut(): void {
    this.auth.logout();
    this.router.navigate(['signIn']);
  }
}
