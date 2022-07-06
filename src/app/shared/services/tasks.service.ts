import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Task } from '../interfaces/task';
import { environment } from '../../../environments/environment';
import { FbCreateResponse } from '../../../environments/interface';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  public create(task: Task): Observable<Task> {
    return this.http
      .post<Task>(
        `${environment.fbDbURL}/users/${this.auth.userId}/tasks.json`,
        task
      )
      .pipe(
        map((response: FbCreateResponse) => {
          return {
            ...task,
            id: response.name,
            date: new Date(task.date),
          };
        })
      );
  }

  public getAllTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(
        `${environment.fbDbURL}/users/${this.auth.userId}/tasks.json`
      )
      .pipe(
        map((response) => {
          return response
            ? Object.entries(response).map((el) => {
                let { name, date, complete, description, position } = el[1];
                return {
                  id: el[0],
                  name,
                  date,
                  complete,
                  description,
                  position,
                };
              })
            : [];
        })
      );
  }

  public deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.fbDbURL}/users/${this.auth.userId}/tasks/${id}.json`
    );
  }

  public completeTask(task: Task): Observable<Task> {
    return this.http.put<Task>(
      `${environment.fbDbURL}/users/${this.auth.userId}/tasks/${task.id}.json`,
      task
    );
  }

  public updateTasks(tasks: any): Observable<any> {
    console.log(tasks);
    return this.http.put<any>(
      `${environment.fbDbURL}/users/${this.auth.userId}/tasks.json`,

      tasks
    );
  }

  public editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(
      `${environment.fbDbURL}/users/${this.auth.userId}/tasks/${task.id}.json`,
      task
    );
  }
}
