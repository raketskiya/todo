import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    public auth: AuthService,
    private ref: ChangeDetectorRef,
    public route: Router
  ) {}

  ngOnInit(): void {
    console.log(this.route.url);
    this.auth.isLogin.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.ref.markForCheck();
      console.log('test');
    });
    this.ref.markForCheck();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // test() {
  //   console.log(this.route.url);
  // }
}
