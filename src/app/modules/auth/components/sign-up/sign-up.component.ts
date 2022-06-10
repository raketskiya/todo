import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../shared/interfaces/user.interface';
import {FbAuthResponse} from '../../../../../environments/interface';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  notMatchPasswords = false;

  ngUnsubscribe: Subject<void> = new Subject();

  handleResponse(response: FbAuthResponse | null, user: User): void {
    this.router.navigate(['/tasks']);
    if(response){
      user.localId = response.localId;
    }
  }

  submit(): void {
    this.notMatchPasswords = false;
    if(this.signUpForm.value.password != this.signUpForm.value.repeatPassword){
      this.notMatchPasswords = true;
      this.signUpForm.reset();
      return
    }

    const user: User = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      localId: '',
      returnSecureToken: false
    }

    this.auth.signUp(user).pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      this.handleResponse(response, user);
    },() => {
      this.signUpForm.reset();
    });

  }

  changeSighType(): void {
    this.router.navigate(['sighIn']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
