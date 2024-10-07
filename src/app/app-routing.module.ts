import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadLocalBdResolver } from './resolver/load-local-bd/load-local-bd.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./pages/task/task.module').then(m => m.TaskModule),
    resolve: {
      loaded: loadLocalBdResolver
    }
  },
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
