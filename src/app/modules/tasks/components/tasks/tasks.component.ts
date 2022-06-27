import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../../../shared/interfaces/task';
import { TasksService } from '../../../../shared/services/tasks.service';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  selectActiveTasks,
  selectCompleteTasks,
} from '../../../../store/tasks/selectors';
import { AppState } from '../../../../store/app-state';
import {
  addActiveTask,
  completeTask,
  deleteTask,
  getAllActiveTasks,
  getAllCompletedTasks,
} from '../../../../store/tasks/actions';

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
  completedTasks: Task[] = [];
  activeTasks: Task[] = [];
  completedTasks$ = this.store.select(selectCompleteTasks);
  activeTasks$ = this.store.select(selectActiveTasks);

  ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    private tasksService: TasksService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllActiveTasks());
    this.store.dispatch(getAllCompletedTasks());
    this.activeTasks$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((activeTasks) => (this.activeTasks = [...activeTasks]));
    this.completedTasks$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (completedTasks) => (this.completedTasks = [...completedTasks])
      );
  }

  public addTask(task: Task): void {
    this.store.dispatch(addActiveTask({ task }));
  }

  public deleteTask(deletedTask: any): void {
    this.store.dispatch(deleteTask(deletedTask));
  }

  public completeTask(task: Task): void {
    this.store.dispatch(completeTask({ task }));
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

      this.store.dispatch(completeTask({ task }));

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
