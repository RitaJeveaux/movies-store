import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Movie } from '../../models/movie';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-movie-card',
  imports: [MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  @Input() movie!: Movie;

}
