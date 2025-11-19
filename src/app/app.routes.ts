import { Routes } from '@angular/router';
import { MovieAdd } from './pages/movie-add/movie-add';
import { MovieList } from './pages/movie-list/movie-list';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { MovieEdit } from './pages/movie-edit/movie-edit';
import { UsersAdd } from './pages/users-add/users-add';



export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MovieList },
  { path: 'add', component: MovieAdd, canActivate: [authGuard] },
  { path: 'edit/:id', component: MovieEdit },
  { path: 'login', component: Login },
  { path: 'users/add', component: UsersAdd },
  { path: '**', component: NotFound },
];


