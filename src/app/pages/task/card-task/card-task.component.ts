import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITask } from 'src/app/interfaces/task.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.scss']
})
export class CardTaskComponent {

  @Input() task!: ITask;

  @Output() updateStatusEvent: EventEmitter<ITask> = new EventEmitter<ITask>()

  constructor(
    private store: Store
  ) {}

  public updateStatus() {
    this.updateStatusEvent.emit(this.task);
  }
}
