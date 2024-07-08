import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseTask, Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrl = 'https://freeapi.gerasim.in/api/JWT/';
  constructor(private http: HttpClient) {}

  getAllTaskList(): Observable<ApiResponseTask> {
    return this.http.get<ApiResponseTask>(this.apiUrl + 'GetAllTaskList');
  }
  addNewTask(obj: Task): Observable<ApiResponseTask> {
    return this.http.post<ApiResponseTask>(this.apiUrl + 'CreateNewTask', obj);
  }
  updateTask(obj: Task): Observable<ApiResponseTask> {
    return this.http.put<ApiResponseTask>(this.apiUrl + 'UpdateTask', obj);
  }
  DeleteTask(id: number): Observable<ApiResponseTask> {
    return this.http.delete<ApiResponseTask>(
      this.apiUrl + 'DeleteTask?itemId=' + id
    );
  }
}
