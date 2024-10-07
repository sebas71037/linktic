import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeAll, Observable, of, timer } from 'rxjs';
import { IPerson } from 'src/app/interfaces/person.interface';
import { getPersonList } from 'src/app/data/person';
import { SocketService } from '../socket/socket.service';
import { SocketEvent } from 'src/app/enum/event.enum';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  
  private apiUrl = 'https://api.example.com/persons';

  constructor(
    private http: HttpClient,
    private socketService: SocketService
  ) {}

  public getPersons(): Observable<IPerson[]> {
    return this.socketService.getSocket().on(SocketEvent.SEND_PERSONS);
  }

}
