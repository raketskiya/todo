import { Component, OnInit } from '@angular/core';
import {TaskInterface} from '../../../../shared/interfaces/task.interface';
import {TaskComponent} from '../task/task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: TaskInterface[] = [{name:'123', date: new Date()}, {name:'122323', date: new Date()}];

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
