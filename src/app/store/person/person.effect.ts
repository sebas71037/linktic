import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { PersonService } from 'src/app/services/person/person.service';
import { loadPersonsSuccess } from './person.actions';

@Injectable()
export class PersonEffects {
  
  constructor(
    private actions$: Actions,
    private personService: PersonService
  ) {}

  loadPersons$ = createEffect(() =>
    this.personService.getPersons().pipe(
      map((persons) => loadPersonsSuccess({ persons }))
    )
  );

}
