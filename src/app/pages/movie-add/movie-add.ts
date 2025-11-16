import { Component } from '@angular/core';
import { MovieForm } from '../../components/movie-form/movie-form';
import { MovieService } from '../../services/movie-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from '../../models/movie';
import { defer, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-add',
  imports: [MovieForm],
  templateUrl: './movie-add.html',
  styleUrl: './movie-add.css',
})
export class MovieAdd {
  constructor(
    private moviesService: MovieService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  onSave({ movie, file }: { movie: Partial<Movie>, file?: File }) {
    defer(() =>
      file
        ? this.moviesService.uploadImage(file)
        : of<{ imageUrl?: string }>({ imageUrl: undefined })
    ).pipe(
      switchMap(({ imageUrl }) => {
        const movieData: Movie = {
          ...movie,
          imageLink: imageUrl || movie.imageLink,
        } as Movie;
        return this.moviesService.createOne(movieData);
      })
    ).subscribe({
      next: (createdMovie: Movie) => {
        this.matSnackBar.open(`O filme '${createdMovie.title}' foi criado com sucesso!`, 'Fechar', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000
        });
        this.router.navigate(['']);
      },
      error: () => {
        this.matSnackBar.open('Não foi possível adicionar o filme.', 'Fechar', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000
        });
      }
    });
  }
}
