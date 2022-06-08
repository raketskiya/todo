import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../shared/interfaces/user.interface';
import {MatDialog} from '@angular/material/dialog';
import {AuthErrorDialogComponent} from '../../../../shared/components/auth-error-dialog/auth-error-dialog.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService, private router: Router, private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  errorMessage = '';
  matchPassword = true;

  openDialog(error: string){
    this.dialogRef.open(AuthErrorDialogComponent, {
      data: error
    })
  }

  handleResponse(response: any, user: User): void {
    this.router.navigate(['/tasks']);
    if(response){
      user.localId = response.localId;
    }
  }

  submit(): void {
    if(this.signUpForm.value.password != this.signUpForm.value.repeatPassword){
      this.openDialog('Passwords do not match');
      this.signUpForm.reset();
      return
    }
    const user: User = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      localId: '',
      returnSecureToken: false
    }
    this.auth.signUp(user).subscribe((response) => {
      this.handleResponse(response, user);
    });
    this.auth.error$.subscribe(el =>{
      this.errorMessage = el;
      if (this.errorMessage != ''){
        this.openDialog(this.errorMessage);
        this.signUpForm.reset();
      }
    })
  }

  changeSighType(): void {
    this.router.navigate(['sighIn']);
  }

  ngOnDestroy(): void {
    this.auth.error$.unsubscribe();
  }
}
