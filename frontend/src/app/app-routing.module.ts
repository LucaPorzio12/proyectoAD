import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieListComponent} from "./components/movie-list/movie-list.component";

const routes: Routes = [
  {path: '', redirectTo: '/movies',pathMatch: 'full'},
  {path: 'movies', component:MovieListComponent},
  {path: '**', redirectTo: '/movies',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
