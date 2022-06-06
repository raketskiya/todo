import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../shared/interfaces/user.interface';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isRegister = false;
  changeButton = "Создать аккаунт";
  loginButton = 'Войти';
  title = 'Sigh in'
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) { }

  authForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordRepeat: new FormControl('', [Validators.minLength(6)]),
  })

  ngOnInit(): void {
  }

  changeAuth(){
    this.isRegister = !this.isRegister;
    this.changeButton = this.isRegister ? 'Уже есть аккаунт' : 'Создать аккаунт';
    this.loginButton = this.isRegister ? 'Создать' : 'Войти';
    this.title = this.isRegister ? 'Sigh up' : 'Sigh in';
  }

  submit() {
    if(this.authForm.invalid){
      return
    }
    const user: User = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
      returnSecureToken: false
    }
    this.auth.login(user).subscribe((response)=>{
      this.authForm.reset()
      this.router.navigate(['/tasks'])
    });


    console.log(user)
  }
}
