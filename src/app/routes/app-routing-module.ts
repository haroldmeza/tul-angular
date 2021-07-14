import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mainRoutes } from './main-routes';

const routes: Routes = [
  ...mainRoutes
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }