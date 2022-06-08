import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../../shared/interfaces/user.interface';
import {FbAuthResponse} from '../../../../../environments/interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isSignUp = false;
  formTouched = false;

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void { }

  handleResponse(response: FbAuthResponse | null, user: User): void {
    this.router.navigate(['/tasks']);
    if(response){
      user.localId = response.localId;
    }
  }

  submit(): void {
    const user: User = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
      localId: '',
      returnSecureToken: false
    }
    if(this.isSignUp){
      this.auth.signUp(user).subscribe((response) => {
        this.handleResponse(response, user);
      });
    } else{
      this.auth.login(user).subscribe((response)=>{
        this.handleResponse(response, user);
      })
    }
  }

  changeSighType(): void {
    this.formTouched = !this.formTouched;
    this.isSignUp = !this.isSignUp;
    this.authForm.reset();
    this.isSignUp ? this.authForm.addControl('repeatPassword', new FormControl(''))
      : this.authForm.removeControl('repeatPassword');
  }
}
