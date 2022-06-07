import {Component,OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../../../shared/interfaces/task';
import {TasksService} from '../../../../shared/services/tasks.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],

})
export class TasksComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  tSub: Subscription;

  constructor(private tasksService: TasksService) {

  }

  ngOnInit(): void {
    this.tSub = this.tasksService.getAll().subscribe((response)=>{
      response.forEach((el: Task) =>{
        this.tasks.push({
          name: el.name,
          date: el.date
        })
      })
    })
  }

  ngOnDestroy(): void {
    if(this.tSub){
      this.tSub.unsubscribe();
    }
  }

  updateTasks(task: Task) {
    this.tasks.push(task);
  }
}
