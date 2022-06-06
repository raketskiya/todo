import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  visibility = true;

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {

  }




  logOut(){
    this.auth.logout();
    this.router.navigate(['']);
  }
}
