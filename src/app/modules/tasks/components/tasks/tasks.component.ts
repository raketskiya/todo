import {Component,OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../../../shared/interfaces/task';
import {TasksService} from '../../../../shared/services/tasks.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {

  complitedTasks: Task[] = [];
  activeTasks: Task[] = [];
  ngUnsubscribe: Subject<void> = new Subject();

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.getAllTasks().pipe(takeUntil(this.ngUnsubscribe)).subscribe(tasks => {
      tasks.forEach(task => {
        task.complete ? this.complitedTasks.push(task) : this.activeTasks.push(task);
      })
    });
  }

  addTask(task: Task): void {
    this.activeTasks.push(task);
  }

  completeTask(complete: any){
    if(complete.complete === true){
      this.complitedTasks = [...this.complitedTasks, ...this.activeTasks.splice(this.activeTasks.findIndex(el => {return el.id === complete.id}),1)];
    } else {
      this.activeTasks = [...this.activeTasks, ...this.complitedTasks.splice(this.complitedTasks.findIndex(el => {return el.id === complete.id}),1)];
    }
  }

  deleteTask(id: string): void {
    this.tasksService.deleteTask(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.activeTasks = this.activeTasks.filter( task => task.id !== id);
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
