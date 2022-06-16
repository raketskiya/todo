import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../../shared/interfaces/user.interface';
import {FbAuthResponse} from '../../../../../environments/interface';
import { Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  constructor(public auth: AuthService, private router: Router) { }


  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]),
  })

  ngUnsubscribe: Subject<void> = new Subject();

  ngOnInit(): void {

  }


  handleResponse(response: FbAuthResponse | null, user: User): void {
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


    this.auth.login(user).pipe(takeUntil(this.ngUnsubscribe)).subscribe((response)=>{
        this.handleResponse(response, user);
    }, () => {
      this.signInForm.reset();
    });

  }

  changeSighType(): void {
    this.router.navigate(['sighUp'])
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
