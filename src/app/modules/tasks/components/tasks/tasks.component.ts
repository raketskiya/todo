import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../../../shared/interfaces/task';
import { TasksService } from '../../../../shared/services/tasks.service';
import { Store } from '@ngrx/store';
import { map, Subject, takeUntil } from 'rxjs';
import {
  CdkDragDrop,
  CdkDragEnter,
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
  updateTasks,
} from '../../../../store/tasks/actions';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../shared/services/auth.service';

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

  testActive: Task[] = [];
  testCompleted: Task[] = [];

  ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    private tasksService: TasksService,
    private store: Store<AppState>,
    private http: HttpClient,
    private auth: AuthService
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
    let tasks = { ...[...this.activeTasks, ...this.completedTasks] };
    let map: any = new Map();
    if (event.previousContainer === event.container) {
      tasks = { ...[...this.activeTasks, ...this.completedTasks] };
      // console.log('DO', this.activeTasks, tasks);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      //tasks = [...this.activeTasks, ...this.completedTasks];
      // tasks = tasks.map((el) => ({ ...el, id: '' }));
      // console.log(tasks);

      //tasks.forEach((el) => this.store.dispatch(addActiveTask({ task: el })));
      // console.log(tasks, 'MASSIV TASOK');
      // for (let task of tasks) {
      //   this.store.dispatch(addActiveTask({ task: task }));
      // }
      // console.log(map, 'MAP TASKS');
      // let mm = JSON.stringify({ tasks: Object.fromEntries(map) });
      // console.log(mm);
      // console.log(JSON.parse(mm));
      //
      //  for (let oldKey in tasks) {
      // //   tasks[tasks[oldKey].id] = tasks[oldKey];
      //   delete tasks[oldKey];
      // }
      // console.log('POSLE', this.activeTasks, tasks);

      // this.store.dispatch(updateTasks({ tasks: mm }));
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

  test() {
    // let mm =
    //   '{"tasks":{"-N5X5KPDFPiWPPQgnMTq":{"name":"2","date":"2022-06-26T22:19:38.375Z","id":"-N5X5KPDFPiWPPQgnMTq","complete":false,"description":null},"-N5X5JTre2brC9BMSYJ_":{"name":"1","date":"2022-06-26T22:19:34.436Z","id":"-N5X5JTre2brC9BMSYJ_","complete":false,"description":""}}}';
    // this.store.dispatch(updateTasks({ tasks: mm }));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
