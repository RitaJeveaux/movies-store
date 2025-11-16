import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Movie } from '../../models/movie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelect, MatOption, ReactiveFormsModule, RouterLink],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.css',
})
export class MovieForm implements OnInit {
  @Input() movie: Movie | null = null;
  @Input() isEditMode = false;
  @Output() save = new EventEmitter<{ movie: Partial<Movie>, file?: File }>();

  formGroup: FormGroup;
  platforms: Array<string> = [
    "In Theaters", "Streaming", "On Demand", "Coming Soon", "Now Playing",
    "Pre-Order", "New Releases", "Top Rated", "Classics", "Exclusive", "Special Edition"
  ];
  genres: Array<string> = [
    "Action", "Drama", "Science Fiction", "Thriller", "Romance", "Horror",
    "Adventure", "Fantasy", "Comedy", "Documentary", "Mystery", "Animation",
    "Biography", "Crime", "Family", "History", "Music", "Musical", "Sport",
    "War", "Western", "Film Noir", "Short Film"
  ];
  imagePreview?: string | null;
  fileError?: string | null;
  file: File | undefined;

  constructor() {
    this.formGroup = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      genre: new FormControl("", [Validators.required]),
      platform: new FormControl("", [Validators.required]),
      imageLink: new FormControl(),
      price: new FormControl<number | null>(null, [Validators.min(0.01)]),
      description: new FormControl(),
      availableInStock: new FormControl<number | null>(null, [Validators.min(1)]),
    });
  }

  ngOnInit(): void {
    if (this.movie) {
      this.formGroup.patchValue(this.movie);
      this.imagePreview = this.movie.imageLink;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.file = input.files?.[0];

    if (!this.file) {
      this.imagePreview = this.isEditMode && this.movie ? this.movie.imageLink : null;
      this.fileError = null;
      return;
    }

    if (!this.file.type.startsWith('image/')) {
      this.fileError = 'Por favor, selecione um arquivo do tipo imagem';
      this.imagePreview = null;
      return;
    }

    this.fileError = null;
    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result as string;
    reader.readAsDataURL(this.file);
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.save.emit({ movie: this.formGroup.value, file: this.file });
  }
}