import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { catchError, debounceTime, interval, mergeMap, Observable, of, retry, Subject, take, takeUntil, throwError } from 'rxjs';
import { IControlField } from 'src/app/interfaces/control-field.interface';
import { IPerson } from 'src/app/interfaces/person.interface';
import { ITask } from 'src/app/interfaces/task.interface';
import { selectAllPersons } from 'src/app/store/person/person.selector';
import { createTask, deleteTask, selectTask, updateTask } from 'src/app/store/task/task.actions';
import { selectedTask } from 'src/app/store/task/task.selector';
import { controlFields } from './form';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('content') content!: TemplateRef<ElementRef>;
  panel!: NgbOffcanvasRef;

  formFields: IControlField = controlFields;
  taskForm!: FormGroup;

  scrollElements = [
    { target: '#task-name', switch: '#task-nav-name', flag: 'taskname' }
  ];

  flags: {[key: string]: boolean} = {
    taskname: false
  };

  destroy = new Subject<boolean>();
  task$: Observable<ITask | undefined> = this.store.select(selectedTask);
  task!: ITask;
  persons$: Observable<IPerson[]> = this.store.select(selectAllPersons);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private offcanvasService: NgbOffcanvas,
    private activatedRoute: ActivatedRoute
  ) { }

  private defaultCreate() {
    this.store.dispatch(createTask({ task: {taskName: 'Nueva tarea', status: false}}))
  }

  private loadTask() {
    const taskId = this.activatedRoute.snapshot.params?.['taskId'];
    
    this.store.dispatch(selectTask({ taskId }));

    interval(1000).pipe(
      mergeMap(() => {
        this.store.dispatch(selectTask({ taskId }));
        if (!this.task) return throwError(() => new Error('Task not found'));
        return of(true);
      }),
      retry(2),
      take(1),
      takeUntil(this.destroy),
      catchError((error) => {
        this.goToDashboard();
        return of(false);
      })
    ).subscribe();
  }

  private build(task: ITask): void {
    this.task = task;
    this.taskForm = this.fb.group(this.formFields.fields);

    const toUpdate = {...task};
    if (toUpdate.dueDate) {
      const date = new Date(toUpdate.dueDate);
      toUpdate.dueDate = {day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()} as any;
    }
    
    this.taskForm.patchValue(toUpdate);

    this.taskForm.valueChanges.pipe(debounceTime(400), takeUntil(this.destroy)).subscribe((task) => this.saveTask());
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
    this.store.dispatch(selectTask({ taskId: undefined }));
  }

  ngOnInit(): void {
    this.task$.pipe(takeUntil(this.destroy)).subscribe(task => {
      const taskId = this.activatedRoute.snapshot.params?.['taskId'];
      if (!task && !taskId) return this.defaultCreate();
      
      if (task) return this.build(task);
      
      this.loadTask();
    });
  }

  ngAfterViewInit(): void {
    this.open();
  }

  private getTask(): ITask {
    const data = {...this.taskForm.value} as ITask;
    const dueDate = ( data.dueDate as any) as NgbDate;
    
    if (data.dueDate) data.dueDate = new Date(`${dueDate.year}-${dueDate.month-1}-${dueDate.day}`);

    data.id = this.task.id;

    return data;
  }

  public saveTask() {
    if (this.taskForm.invalid) return;

    const data = this.getTask();
    this.store.dispatch(updateTask({ task: data }));
  }

  private async open(): Promise<void> {
    this.panel = this.offcanvasService.open(this.content, {position: 'end', panelClass: 'todo-panel'});

    try {
      const response = await this.panel.result;
    } catch (error) {
      this.goToDashboard();
    }
  }

  public onScroll(event: Event): void {
    for (const condition of this.scrollElements) {
      const element = document.querySelector(condition.target);
      const switchElement = document.querySelector(condition.switch);
      if (!element || !switchElement) continue;
      
      const rect = element.getBoundingClientRect();
      this.flags[condition.flag] = rect.top < 0;
    }
  }

  public updateStatus(event: Event): void {
    const statusControl = this.taskForm.controls['status'];
    statusControl.patchValue(!statusControl.value);
  }

  public deleteTask(event: Event): void {
    const data = this.getTask();
    this.store.dispatch(deleteTask({task: data}));
    this.goToDashboard()
  }

  public goToDashboard(): void {
    this.panel.close();
    this.router.navigate(['/tasks/']);
  }
}
