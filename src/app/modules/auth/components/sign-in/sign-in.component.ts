import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  constructor(public auth: AuthService, private router: Router) { }

  errorMessage = '';

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  ngOnInit(): void { }


  handleResponse(response: any, user: User): void {
    this.router.navigate(['/tasks']);
    if(response){
      user.localId = response.localId;
    }
  }

  submit(): void {
    const user: User = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
      localId: '',
      returnSecureToken: false
    }

    this.signInForm.reset();
    this.auth.login(user).subscribe((response)=>{
        this.handleResponse(response, user);
    });

  }

  changeSighType(): void {
    this.router.navigate(['sighUp'])
  }


  ngOnDestroy() {

  }
}
