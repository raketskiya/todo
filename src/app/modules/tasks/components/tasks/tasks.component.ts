import { Component, OnInit } from '@angular/core';
import {Task} from '../../../../shared/interfaces/task';
import {TaskComponent} from '../task/task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  updateTasks(task: Task){
    this.tasks.push(task)
  }

}
