import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, switchMap } from 'rxjs';
import { TasksService } from '../../shared/services/tasks.service';
import { Task } from '../../shared/interfaces/task';
import {
  addActiveTask,
  addActiveTaskSuccess,
  editTask,
  getAllTasks,
  getAllTasksSuccess,
  updateTasks,
} from './actions';

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions, private tasksService: TasksService) {}

  private loadAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTasks),
      switchMap(() =>
        this.tasksService.getAllTasks().pipe(
          map((tasks: Task[]) => getAllTasksSuccess({ tasks })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  private addActiveTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addActiveTask),
      mergeMap((el) =>
        this.tasksService.create(el.task).pipe(
          map((task: Task) => addActiveTaskSuccess({ task })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  private editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTask),
      mergeMap((task) =>
        this.tasksService.editTask(task.task).pipe(
          map(() => getAllTasks()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTasks),
      switchMap((tasks) =>
        this.tasksService.updateTasks(tasks.tasks).pipe(
          map(() => getAllTasks()),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
