import { createReducer, on } from '@ngrx/store';
import { Task } from '../../shared/interfaces/task';
import { addActiveTaskSuccess, getAllTasksSuccess } from './actions';

export interface TasksState {
  activeTasks: Task[];
  complitedTasks: Task[];
}

export const initialState: TasksState = {
  activeTasks: [],
  complitedTasks: [],
};

export const tasksReducer = createReducer(
  initialState,
  on(addActiveTaskSuccess, (state, { task }) => ({
    ...state,
    activeTasks: [...state.activeTasks, task],
  })),
  on(getAllTasksSuccess, (state, { tasks }) => {
    const completeTasks: Task[] = [];
    const activeTasks: Task[] = [];
    tasks.forEach((task) => {
      task.complete ? completeTasks.push(task) : activeTasks.push(task);
    });
    return {
      ...state,
      complitedTasks: completeTasks,
      activeTasks,
    };
  })
);
