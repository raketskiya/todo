import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isSignUp = false;

  authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
  })

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  handleResponse(response: any, user: User): void {
    this.authForm.reset();
    this.router.navigate(['/tasks']);
    if(response){
      user.localId = response.localId;
    }
  }



  submit(){
    const user: User = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
      localId: '',
      returnSecureToken: false
    }
    if(this.isSignUp){
      console.log('up')
      this.auth.signUp(user).subscribe((response)=>{
        this.handleResponse(response, user);
      });
    } else{
      console.log('in')
      this.auth.login(user).subscribe((response)=>{
        this.handleResponse(response, user)
      })
    }
  }

  changeSighType() {
    this.isSignUp = !this.isSignUp;
    this.authForm.reset();
  }
}
