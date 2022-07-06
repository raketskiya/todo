import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
  getAllTasks,
  updateTasks,
} from '../../../../store/tasks/actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public completedTasks: Task[] = [];
  public activeTasks: Task[] = [];
  private completedTasks$ = this.store.select(selectCompleteTasks);
  private activeTasks$ = this.store.select(selectActiveTasks);

  public activeSpinner: number = 0;
  public completedSpinner: number = 0;

  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    private tasksService: TasksService,
    private store: Store<AppState>,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(getAllActiveTasks());
    // this.store.dispatch(getAllCompletedTasks());
    this.store.dispatch(getAllTasks());
    this.activeTasks$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((activeTasks) => {
        this.activeTasks = [...activeTasks].sort((a, b) => {
          return a.position - b.position;
        });
        this.activeSpinner++;
        this.ref.markForCheck();
      });
    this.completedTasks$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((completedTasks) => {
        this.completedTasks = [...completedTasks].sort((a, b) => {
          return a.position - b.position;
        });
        this.completedSpinner++;
        this.ref.markForCheck();
      });
  }

  public addTask(task: Task): void {
    this.store.dispatch(addActiveTask({ task }));
  }

  public deleteTask(task: any): void {
    if (task.complete) {
      const index: number = this.completedTasks.findIndex(
        (el) => el.id === task.id
      );
      this.completedTasks.splice(index, 1);
    } else {
      const index: number = this.activeTasks.findIndex(
        (el) => el.id === task.id
      );
      this.activeTasks.splice(index, 1);
    }
    this.updateTasks(this.activeTasks, this.completedTasks);
  }

  public completeTask(task: Task): void {
    if (task.complete) {
      const index = this.completedTasks.findIndex((el) => el.id === task.id);
      this.activeTasks.push(this.completedTasks.splice(index, 1)[0]);
    } else {
      const index = this.activeTasks.findIndex((el) => el.id === task.id);
      this.completedTasks.push(this.activeTasks.splice(index, 1)[0]);
    }
    this.updateTasks(this.activeTasks, this.completedTasks, task);
  }

  public drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateTasks(this.activeTasks, this.completedTasks);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateTasks(this.activeTasks, this.completedTasks, task);
    }
  }

  private updateTasks(active: Task[], complete: Task[], task?: Task): void {
    const activeTasksObj: Object = {};
    const completeTasksObj: Object = {};
    const tasksObj: Object = {};

    active.forEach(
      (el, index) => (activeTasksObj[el.id] = { ...el, position: index })
    );
    complete.forEach(
      (el, index) => (completeTasksObj[el.id] = { ...el, position: index })
    );

    Object.assign(tasksObj, activeTasksObj, completeTasksObj);

    if (task) {
      tasksObj[task.id].complete = !tasksObj[task.id].complete;
    }

    this.store.dispatch(updateTasks({ tasks: tasksObj }));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
