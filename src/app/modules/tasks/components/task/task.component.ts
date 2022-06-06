import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../../shared/interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() name:string = '';
  @Input() date: Date = new Date();


  constructor() { }

  ngOnInit(): void {
  }


}
