import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from '../../models/movie';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MovieService } from '../../services/movie-service';
import { DeleteDialog } from '../delete-dialog/delete-dialog';

@Component({
  selector: 'app-movie-card',
  imports: [MatIconModule, MatButtonModule, MatCardModule, RouterModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  @Input() movie!: Movie;
  @Output() deleteCard: EventEmitter<string> = new EventEmitter();

  constructor(private dialog: MatDialog, private moviesService: MovieService, private snackBar: MatSnackBar) { }


  confirmDelete() {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: {
        title: this.movie.title
      }
    });
    dialogRef
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (!confirm) return;

        this.moviesService.deleteOne(this.movie.id).subscribe({
          next: () => {
            this.snackBar.open('Filme excluído com sucesso!', 'Fechar', {
              horizontalPosition: "end",
              verticalPosition: "top",
              duration: 3000
            });

            this.deleteCard.emit(this.movie.id);
          },
          error: () => {
            this.snackBar.open('Não foi possível excluir o filme.', 'Fechar', {
              horizontalPosition: "end",
              verticalPosition: "top",
              duration: 3000
            });
          }
        })
      })
  }
}

