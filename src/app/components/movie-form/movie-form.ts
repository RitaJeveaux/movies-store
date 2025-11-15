import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { defer, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-movie-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelect, MatOption, ReactiveFormsModule],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.css',
})
export class MovieForm {
  formGroup: FormGroup;
  platforms: Array<string> = [
    "In Theaters",
    "Streaming",
    "On Demand",
    "Comming Soon",
  ];
  genres: Array<string> = [
    "Action",
    "Drama",
    "Science Fiction",
    "Thriller",
    "Romance",
    "Horror",
  ];
  imagePreview?: string | null;
  fileError?: string | null;
  file: File | undefined;

  constructor(private moviesService: MovieService, private router: Router, private matSnackBar: MatSnackBar) {
    this.formGroup = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      genre: new FormControl("", [Validators.required]),
      platform: new FormControl("", [Validators.required]),
      imageLink: new FormControl(),
      price: new FormControl<number | null>(null, [Validators.min(0.01)]),
      description: new FormControl(),
      availableInStock: new FormControl<number | null>(null, [Validators.min(1)]),
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.file = input.files?.[0];

    if (!this.file) {
      this.imagePreview = null;
      return;
    }

    if (!this.file.type.startsWith('image/')) {
      this.fileError = 'Por favor, selecione um arquivo do tipo imagem';
      this.imagePreview = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result as string;
    reader.readAsDataURL(this.file);
  }

  onSubmit() {
    console.log(this.formGroup.value);
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    };

    defer(() =>
      this.file
        ? this.moviesService.uploadImage(this.file)
        : of <{ imageUrl?: string }>({ imageUrl: undefined })
    ).pipe(
      switchMap
      (({ imageUrl }) => {
        const movieData: Movie = {
          ...this.formGroup.value,
          imageLink: imageUrl,
        };
        return this.moviesService.createOne(movieData);
      })
    ).subscribe({
      next: (movie: Movie) => {
        this.matSnackBar.open(`O filme '${movie.title}' foi criado com sucesso!`, 'Fechar', {
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