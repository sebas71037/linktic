import { createReducer, on } from '@ngrx/store';
import { IPerson } from 'src/app/interfaces/person.interface';
import { loadPersonsSuccess } from './person.actions';

export interface PersonState {
  persons: IPerson[];
  loading: boolean;
  /* Creation */
  error: any;
}

export const initialState: PersonState = {
  persons: [],
  loading: true,
  error: null
};

export const personReducer = createReducer(
  initialState,
  on(loadPersonsSuccess, (state, { persons }) => ({
    ...state,
    loading: false,
    persons
  }))
);
