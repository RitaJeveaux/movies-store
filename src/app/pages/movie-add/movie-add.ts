import { Component } from '@angular/core';
import { MovieForm } from '../../components/movie-form/movie-form';
import { MovieService } from '../../services/movie-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from '../../models/movie';
import { defer, of, switchMap } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-add',
  imports: [MovieForm, TranslateModule],
  templateUrl: './movie-add.html',
  styleUrl: './movie-add.css',
})
export class MovieAdd {
  constructor(
    private moviesService: MovieService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

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
        const successMessage =
          `${this.translate.instant('ADDMOVIE.MOVIE')} '${createdMovie.title}' ${this.translate.instant('ADDMOVIE.ADD')}`;

        this.matSnackBar.open(
          successMessage,
          this.translate.instant('ADDMOVIE.CLOSE'), {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
        this.router.navigate(['']);
      },
      error: () => {
        this.matSnackBar.open(
          this.translate.instant('ADDMOVIE.NOT_ADD'),
          this.translate.instant('ADDMOVIE.CLOSE'), {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
      }
    });
  }
}
