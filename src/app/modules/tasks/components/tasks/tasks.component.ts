import {Component,OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../../../shared/interfaces/task';
import {TasksService} from '../../../../shared/services/tasks.service';
import {Subject, Subscription, takeUntil} from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],

})
export class TasksComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  ngUnsubscribe: Subject<void> = new Subject();

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.getAllTasks().pipe(takeUntil(this.ngUnsubscribe)).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  updateTasks(task: Task): void {
    this.tasks.push(task);
    console.log(this.tasks)
  }

  deleteTask(id: string){
    this.tasksService.deleteTask(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.tasks = this.tasks.filter( task => task.id !== id);
    })

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
