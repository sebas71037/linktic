import { createAction, props } from '@ngrx/store';
import { IPerson } from 'src/app/interfaces/person.interface';

export const loadPersons = createAction('[Person] Load Persons');

export const loadPersonsSuccess = createAction(
  '[Person] Load Persons Success',
  props<{ persons: IPerson[] }>()
);
