import { Component, OnInit } from '@angular/core';
import {Task} from '../../../../shared/interfaces/task';
import {TaskComponent} from '../task/task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [{name:'123', date: new Date()}, {name:'122323', date: new Date()}];

  constructor() { }

  ngOnInit(): void {
  }

  updateTasks(name: string){
    this.tasks.push({
      name: name,
      date: new Date()
    })
  }

}
