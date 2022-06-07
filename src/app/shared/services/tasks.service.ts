import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Task} from '../interfaces/task';
import {environment} from '../../../environments/environment';
import {FbCreateResponse} from '../../../environments/interface';

@Injectable({providedIn: 'root'})
export class TasksService{
  constructor(private http: HttpClient) {
  }

  create(task: Task): Observable<Task>{
    return this.http.post<Task>(`${environment.fbDbURL}/users/${localStorage.getItem('userId')}/tasks.json`, task)
      .pipe(
        map((response:FbCreateResponse)=>{
          return{
            ...task,
            id: response.name,
            date: new Date(task.date)
          }
        })
      )
  }

  getAll(){
    return this.http.get(`${environment.fbDbURL}/users/${localStorage.getItem('userId')}/tasks.json`)
  }
}
