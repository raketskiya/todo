import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
