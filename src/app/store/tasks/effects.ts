import { Injectable } from '@angular/core';
import { TasksService } from '../../shared/services/tasks.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  EMPTY,
  filter,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { createAction, props } from '@ngrx/store';
import { Task } from '../../shared/interfaces/task';
import {
  addActiveTask,
  addActiveTaskSuccess,
  completeTask,
  completeTaskSuccess,
  deleteTask,
  deleteTaskSuccess,
  editTask,
  getAllActiveTasks,
  getAllActiveTasksSuccess,
  getAllCompletedTasks,
  getAllCompletedTasksSuccess,
  updateTasks,
} from './actions';

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions, private tasksService: TasksService) {}

  private loadAllActiveTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllActiveTasks),
      switchMap(() =>
        this.tasksService.getAllTasks(false).pipe(
          map((tasks) => getAllActiveTasksSuccess({ tasks: tasks })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  private loadAllCompletedTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllCompletedTasks),
      switchMap(() =>
        this.tasksService.getAllTasks(true).pipe(
          map((tasks: Task[]) => getAllCompletedTasksSuccess({ tasks: tasks })),
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
          map((task: Task) => addActiveTaskSuccess({ task: task })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  private deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      tap(console.log),
      mergeMap((el) =>
        this.tasksService.deleteTask(el.id).pipe(
          map(() =>
            deleteTaskSuccess({ taskId: el.id, complete: el.complete })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  private completeTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(completeTask),
      mergeMap((task) =>
        this.tasksService
          .completeTask({ ...task.task, complete: !task.task.complete })
          .pipe(
            map(() =>
              completeTaskSuccess({
                task: { ...task.task, complete: !task.task.complete },
              })
            ),
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
          switchMap(() => [getAllCompletedTasks(), getAllActiveTasks()]),
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
          switchMap(() => [getAllCompletedTasks(), getAllActiveTasks()]),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
