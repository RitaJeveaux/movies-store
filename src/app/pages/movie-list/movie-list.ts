import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieCard } from '../../components/movie-card/movie-card';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit {
  movies: Array<Movie> = [];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getAll().subscribe((movies: Array<Movie>) => {
      console.log(movies);
      this.movies = movies;

    });
  }
  deleteCard(id: string) {
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }
}