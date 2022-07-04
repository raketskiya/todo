import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todo';

  constructor(
    public translateService: TranslateService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.translateService.use(environment.locales[0]);
  }
}
