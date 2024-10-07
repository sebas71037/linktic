import { BehaviorSubject, firstValueFrom, Observable, Subject, timer } from "rxjs";
import { SocketEvent } from "../enum/event.enum";
import { StorageKey } from "../enum/stoage.enum";
import { ITask } from "../interfaces/task.interface";
import { IPerson } from "../interfaces/person.interface";

/**
 * Simulate a client socket instance
 */
export class SocketSimulation {

    events: {[key: string]: BehaviorSubject<any>} = {
        [SocketEvent.SEND_TASKS]: new BehaviorSubject<ITask[]>([]),
        [SocketEvent.SEND_NEW_TASK]: new BehaviorSubject<ITask | null>(null),
        [SocketEvent.SEND_PERSONS]: new BehaviorSubject<IPerson[]>([]),
    };

    constructor() {
        this.emit(SocketEvent.LOAD_TASKS, {});
        this.emit(SocketEvent.LOAD_PERSONS, {});
    }

    private parse(query: string | null) {
        try {
            if (!query) return null;
            return JSON.parse(query);
        } catch (error) {
            return null;
        }
    }

    private getItem(key: StorageKey) {
        return this.parse(localStorage.getItem(key));
    }

    private setItem(key: StorageKey, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    public on<T>(event: string): Observable<T> {
        const reference = this.events[event];
        return reference.asObservable();
    }

    public async emit(event: string, data: any): Promise<void> {
        await firstValueFrom(timer(1000));

        switch(event) {
            case SocketEvent.LOAD_TASKS:
                this.sendTasks();
                break;
            case SocketEvent.CREATE_TASK:
                this.createTask(data);
                break;
            case SocketEvent.UPDATE_TASK:
                this.updateTask(data);
                break;
            case SocketEvent.DELETE_TASK:
                this.deleteTask(data);
                break;
            case SocketEvent.LOAD_PERSONS:
                this.sendPersons();
                break;
        }
    }

    public sendTasks(): void {
        const reference = this.events[SocketEvent.SEND_TASKS];
        const tasks = this.getItem(StorageKey.TASK);
        reference.next(tasks);
    }

    public sendNewTask(task: ITask): void {
        const reference = this.events[SocketEvent.SEND_NEW_TASK];
        reference.next(task);
    }

    public createTask(task: ITask): void {
        const targetTask = {...task};
        targetTask.id = Date.now();
        targetTask.update_date = new Date(Date.now());

        let tasks = this.getItem(StorageKey.TASK) as ITask[];
        tasks = [targetTask, ...tasks];

        this.setItem(StorageKey.TASK, tasks);
        this.sendTasks();
        this.sendNewTask(targetTask);
    }

    public updateTask(task: ITask): void {
        const targetTask = {...task};

        let tasks = this.getItem(StorageKey.TASK) as ITask[];
        tasks = tasks.map(t =>
            t.id === targetTask.id
              ? { ...t, ...targetTask, update_date: new Date(Date.now()) }
              : t
        );

        this.setItem(StorageKey.TASK, tasks);
        this.sendTasks();
    }

    public deleteTask(task: ITask): void {
        const targetTask = {...task};

        let tasks = this.getItem(StorageKey.TASK) as ITask[];
        tasks = tasks.filter(t => t.id != targetTask.id);

        this.setItem(StorageKey.TASK, tasks);
        this.sendTasks();
    }

    public sendPersons(): void {
        const reference = this.events[SocketEvent.SEND_PERSONS];
        const persons = this.getItem(StorageKey.PERSON);
        reference.next(persons);
    }
}