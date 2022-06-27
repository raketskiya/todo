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

  loadAllActiveTasks$ = createEffect(() =>
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

  loadAllCompletedTasks$ = createEffect(() =>
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

  addActiveTask$ = createEffect(() =>
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

  deleteTask$ = createEffect(() =>
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

  completeTask$ = createEffect(() =>
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

  // updateTask$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(updateTasks),
  //     tap(console.log),
  //     mergeMap((tasks) =>
  //       this.tasksService.updateTasks(tasks.tasks).pipe(
  //         map(() => getAllActiveTasks(), getAllCompletedTasks()),
  //         catchError(() => EMPTY)
  //       )
  //     )
  //   )
  // );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTask),
      mergeMap((task) =>
        this.tasksService.updateTask(task.task).pipe(
          switchMap(() => [getAllCompletedTasks(), getAllActiveTasks()]),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
