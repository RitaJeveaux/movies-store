import { Component, OnInit } from '@angular/core';
import { MovieForm } from '../../components/movie-form/movie-form';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from '../../models/movie';
import { defer, of, switchMap } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-movie-edit',
  imports: [MovieForm, TranslateModule],
  templateUrl: './movie-edit.html',
  styleUrl: './movie-edit.css',
})
export class MovieEdit implements OnInit {
  movie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MovieService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.moviesService.getOne(id).subscribe(movie => {
        this.movie = movie;
      });
    }
  }

  onSave({ movie, file }: { movie: Partial<Movie>, file?: File }) {
    if (!this.movie?.id) return;

    defer(() =>
      file
        ? this.moviesService.uploadImage(file)
        : of({ imageUrl: this.movie?.imageLink })
    ).pipe(
      switchMap(({ imageUrl }) => {
        const movieData: Movie = {
          ...this.movie,
          ...movie,
          id: this.movie!.id,
          imageLink: imageUrl,
        } as Movie;
        return this.moviesService.updateOne(this.movie!.id, movieData);
      })
    ).subscribe({
      next: (updatedMovie: Movie) => {
       const successMessage = `${this.translate.instant('EDITMOVIE.MOVIE')} '${updatedMovie.title}' ${this.translate.instant('EDITMOVIE.ADD')}`;
        this.matSnackBar.open(successMessage, this.translate.instant('EDITMOVIE.CLOSE'), {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
        this.router.navigate(['']);
      },
      error: () => {
        this.matSnackBar.open(
          this.translate.instant('EDITMOVIE.NOT_ADD'), 
          this.translate.instant('EDITMOVIE.CLOSE'), {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        });
      }
    });
  }
}
