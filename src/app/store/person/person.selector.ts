import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PersonState } from './person.reducer';
import { EFeatureKey } from 'src/app/enum/feature-key.enum';

export const selectPersonState = createFeatureSelector<PersonState>(EFeatureKey.PERSON);

export const selectAllPersons = createSelector(
  selectPersonState,
  (state: PersonState) => state.persons
);

export const loadingPersons = createSelector(
    selectPersonState,
    (state: PersonState) => state.loading
);
