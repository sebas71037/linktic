import {Validators} from '@angular/forms';
import { IControlField } from 'src/app/interfaces/control-field.interface';

export const controlFields: IControlField = {
  messages: {
    status: { },
    taskName: {
      required: 'El nombre de la tarea es obligatorio'
    },
    dueDate: { },
    description: { },
    assigneTo: { }
  },
  fields: {
    status: [false, []],
    taskName: [null, [Validators.required]],
    dueDate: [null, []],
    description: [null, []],
    assigneTo: [null, []]
  }
};
