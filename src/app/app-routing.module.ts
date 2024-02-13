import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'languages',
    loadComponent: () => import('@language/language.component'),
  },
  {
    path: 'about',
    loadComponent: () => import('@about/about.component'),
  },
  { path: '', redirectTo: 'languages', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
