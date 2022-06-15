import {Component,OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../../../shared/interfaces/task';
import {TasksService} from '../../../../shared/services/tasks.service';
import {Subject, takeUntil} from 'rxjs';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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

  completeTask(complete: any | Task){
    if(complete.complete === true){
      this.complitedTasks = [...this.complitedTasks, ...this.activeTasks.splice(this.activeTasks.findIndex(el => {return el.id === complete.id}),1)];
      console.log('complited', this.complitedTasks)
    } else {
      this.activeTasks = [...this.activeTasks, ...this.complitedTasks.splice(this.complitedTasks.findIndex(el => {return el.id === complete.id}),1)];
      console.log('active', this.activeTasks)
    }
  }

  deleteTask(id: string): void {
    this.tasksService.deleteTask(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.activeTasks = this.activeTasks.filter( task => task.id !== id);
    })
  }

  drop(event: CdkDragDrop<Task[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      const task = {...event.previousContainer.data[event.previousIndex], complete: !event.previousContainer.data[event.previousIndex].complete};
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      if(task.complete){
        this.tasksService.completeTask(task).subscribe();
        this.complitedTasks[this.complitedTasks.findIndex(el => {return el.id === task.id})].complete = true;
      } else {
        this.tasksService.completeTask(task).subscribe();
        this.activeTasks[this.activeTasks.findIndex(el => {return el.id === task.id})].complete = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
