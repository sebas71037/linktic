import { ResolveFn } from '@angular/router';
import { getPersonList } from 'src/app/data/person';
import { getTasksList } from 'src/app/data/tasks';
import { StorageKey } from 'src/app/enum/stoage.enum';

export const loadLocalBdResolver: ResolveFn<boolean> = (route, state) => {
  const loaded = localStorage.getItem(StorageKey.LOADED);

  if (!loaded) {
    localStorage.setItem(StorageKey.TASK, JSON.stringify(getTasksList()));
    localStorage.setItem(StorageKey.PERSON, JSON.stringify(getPersonList()));
    localStorage.setItem(StorageKey.LOADED, 'true');
  }

  return true;
};
