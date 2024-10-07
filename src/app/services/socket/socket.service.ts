import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, timer } from 'rxjs';
import { IPerson } from 'src/app/interfaces/person.interface';
import { getPersonList } from 'src/app/data/person';
import { SocketSimulation } from 'src/app/lib/socket.simulation';
import { io } from 'src/app/lib/io.simulation';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  private apiUrl = 'https://api.example.com/socket/connect';
  private socket!: SocketSimulation;

  constructor(
    private http: HttpClient
  ) {
    this.init();
  }

  public init(): void {
    if (this.socket) return;

    this.socket = io(this.apiUrl, {});
  }

  public getSocket() {
    return this.socket;
  }
}
