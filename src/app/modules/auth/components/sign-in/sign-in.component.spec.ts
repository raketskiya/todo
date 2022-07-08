import { HttpClient } from '@angular/common/http';
import { SignInComponent } from './sign-in.component';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AuthService } from '../../../../shared/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ControlsModule } from '../../../../shared/controls/controls.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { routes } from '../../../../app-routing.module';
import { Location } from '@angular/common';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let user = {
    login: 'a@mail.ru',
    password: '123123',
  };
  let location: Location;
  let router: Router;

  const fakeAuthService = jasmine.createSpyObj('authService', ['login']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
          useDefaultLang: false,
        }),
        HttpClientTestingModule,
        ControlsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [SignInComponent],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form controls should be invalid', () => {
    const emailControl = component.signInForm.get('email');
    const passwordControl = component.signInForm.get('password');
    emailControl?.setValue('');
    passwordControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();
    expect(passwordControl?.valid).toBeFalse();
  });

  it('form controls should be valid', () => {
    const emailControl = component.signInForm.get('email');
    const passwordControl = component.signInForm.get('password');
    emailControl?.setValue(user.login);
    passwordControl?.setValue(user.password);
    expect(emailControl?.valid).toBeTruthy();
    expect(passwordControl?.valid).toBeTruthy();
  });

  it('should call login on login button click', () => {
    const emailControl = component.signInForm.get('email');
    const passwordControl = component.signInForm.get('password');
    emailControl?.setValue(user.login);
    passwordControl?.setValue(user.password);
    const event = spyOn(component, 'submit');
    const button = fixture.debugElement.query(By.css('.submit-btn'));
    event.calls.reset();
    fixture.detectChanges();
    button.nativeElement.click();
    expect(event).toHaveBeenCalledWith();
  });

  it('should switch to signUp on Create an account button click', () => {
    const event = spyOn(component, 'changeSighType');
    const button = fixture.debugElement.query(By.css('.change-type-btn'));
    event.calls.reset();
    fixture.detectChanges();
    button.nativeElement.click();
    expect(event).toHaveBeenCalledWith();
  });
  it('should navigate to "signUp"', fakeAsync(() => {
    console.log(router);
    router.navigate(['/signUp']).then(() => {
      expect(location.path()).toBe('/signUp');
    });
  }));
});
