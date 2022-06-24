import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../../../shared/interfaces/task';
import { TasksService } from '../../../../shared/services/tasks.service';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { animate, style, transition, trigger } from '@angular/animations';
import { addtask } from '../../../../store/tasks/actions';
import { selectActiveTasks } from '../../../../store/tasks/selectors';
import { AppState } from '../../../../store/app-state';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    trigger('appearance', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('0.7s', style({ opacity: 1 })),
      ]),
      transition('* => void', [animate('0.7s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class TasksComponent implements OnInit, OnDestroy {
  complitedTasks: Task[] = [];
  activeTasks: Task[] = [];
  ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    private tasksService: TasksService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.tasksService
      .getAllTasks()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((tasks: Task[]) => {
        tasks.forEach((task: Task) => {
          task.complete
            ? this.complitedTasks.push(task)
            : this.activeTasks.push(task);
        });
      });
  }

  public addTask(task: Task): void {
    this.activeTasks.push(task);
  }

  public test(task: any) {
    this.store.dispatch(addtask({ task }));
  }

  private transferTask(
    senderArray: Task[],
    receiverArray: Task[],
    task: Task
  ): Task[] {
    const index = senderArray.findIndex((el) => el.id === task.id);
    return [...receiverArray, ...senderArray.splice(index, 1)];
  }

  public completeTask(completeTask: Task): void {
    if (completeTask.complete) {
      this.complitedTasks = this.transferTask(
        this.activeTasks,
        this.complitedTasks,
        completeTask
      );
    } else {
      this.activeTasks = this.transferTask(
        this.complitedTasks,
        this.activeTasks,
        completeTask
      );
    }
    this.sendCompleteChangeTask(completeTask);
  }

  public deleteTask(DeletedTask: any): void {
    this.tasksService
      .deleteTask(DeletedTask.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        DeletedTask.complete
          ? (this.complitedTasks = this.complitedTasks.filter(
              (task) => task.id !== DeletedTask.id
            ))
          : (this.activeTasks = this.activeTasks.filter(
              (task) => task.id !== DeletedTask.id
            ));
      });
  }

  private sendCompleteChangeTask(task: Task): void {
    this.tasksService
      .completeTask(task)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe();
  }

  public drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.sendCompleteChangeTask(task);
    }
  }

  public changeCompleteProperty(event: CdkDragEnter) {
    event.item.data.complete = !event.item.data.complete;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
