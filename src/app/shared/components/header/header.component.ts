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
    if (localStorage.getItem(fbToken)) {
      this.auth.fbToken = String(localStorage.getItem(fbToken));
      this.auth.fbTokenExp = String(localStorage.getItem(fbTokenExp));
      this.auth.userId = String(localStorage.getItem(userId));
    }
  }

  logOut(): void {
    this.auth.logout();
    this.router.navigate(['signIn']);
  }
}
