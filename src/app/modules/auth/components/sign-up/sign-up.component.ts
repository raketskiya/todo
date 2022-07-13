import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth.service';
import { User } from '../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnDestroy {
  public signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  public notMatchPasswords = false;

  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(public authService: AuthService, private router: Router) {}

  public submit(): void {
    this.notMatchPasswords = false;
    if (
      this.signUpForm.value.password !== this.signUpForm.value.repeatPassword
    ) {
      this.notMatchPasswords = true;
      this.signUpForm.reset();
      return;
    }

    const user: User = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      localId: '',
      returnSecureToken: false,
    };

    this.authService
      .signUp(user)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response) {
            this.router.navigate(['/tasks']);
          }
        },
        () => {
          this.signUpForm.reset();
        }
      );
  }

  public changeSighType(): void {
    this.router.navigate(['signIn']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
