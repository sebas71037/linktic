import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, timer } from 'rxjs';
import { SocketEvent } from 'src/app/enum/event.enum';
import { ITask } from 'src/app/interfaces/task.interface';
import { SocketService } from '../socket/socket.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private apiUrl = 'https://api.example.com/tasks';

  constructor(
    private http: HttpClient,
    private socketService: SocketService
  ) {}

  public getTasks(): Observable<ITask[]> {
    return this.socketService.getSocket().on(SocketEvent.SEND_TASKS);
  }

  public newTask(): Observable<ITask> {
    return this.socketService.getSocket().on(SocketEvent.SEND_NEW_TASK);
  }

  public createTask(task: ITask): void {
    this.socketService.getSocket().emit(SocketEvent.CREATE_TASK, task);
  }

  public updateTask(task: ITask): void {
    this.socketService.getSocket().emit(SocketEvent.UPDATE_TASK, task);
  }

  public deleteTask(task: ITask): void {
    this.socketService.getSocket().emit(SocketEvent.DELETE_TASK, task);
  }
}
