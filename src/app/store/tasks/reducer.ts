import { Task } from '../../shared/interfaces/task';
import { createReducer, on } from '@ngrx/store';
import {
  addActiveTaskSuccess,
  completeTaskSuccess,
  deleteTaskSuccess,
  getAllActiveTasksSuccess,
  getAllCompletedTasksSuccess,
} from './actions';

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
  on(getAllActiveTasksSuccess, (state, { tasks }) => ({
    ...state,
    activeTasks: tasks,
  })),
  on(getAllCompletedTasksSuccess, (state, { tasks }) => ({
    ...state,
    complitedTasks: tasks,
  })),
  on(deleteTaskSuccess, (state, { taskId, complete }) => {
    if (complete) {
      const completed = state.complitedTasks.filter(
        (task) => task.id != taskId
      );
      return { ...state, complitedTasks: completed };
    } else {
      const active = state.activeTasks.filter((task) => task.id != taskId);
      return { ...state, activeTasks: active };
    }
  }),
  on(completeTaskSuccess, (state, { task }) => {
    if (task.complete) {
      const active = state.activeTasks.filter((el) => el.id != task.id);
      return {
        ...state,
        activeTasks: active,
        complitedTasks: [...state.complitedTasks, task],
      };
    } else {
      const completed = state.complitedTasks.filter((el) => el.id != task.id);
      return {
        ...state,
        complitedTasks: completed,
        activeTasks: [...state.activeTasks, task],
      };
    }
  })
);
