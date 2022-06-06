import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  title = 'Sign in';
  formButtonLabel = 'Войти';
  changeLoginType = 'Создать аккаунт';
  isSignUp = false;

  authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
  })

  constructor(private auth: AuthService, private roter: Router) { }

  ngOnInit(): void {
  }

  submit(){
    const user: User = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
      returnSecureToken: false
    }

    this.auth.login(user).subscribe((response)=>{
      this.authForm.reset();
      console.log(response)
      this.roter.navigate(['/tasks']);
    })
  }

  changeSighType() {
    this.isSignUp = !this.isSignUp;
    this.title = this.isSignUp ? 'Sign up' : 'Sign in';
    this.formButtonLabel = this.isSignUp ? 'Создать' : 'Войти';
    this.changeLoginType = this.isSignUp ? 'Аккаунт уже есть' : 'Создать аккаунт';
  }
}
