import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Movie } from '../../models/movie';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../delete-dialog/delete-dialog';
import { MovieService } from '../../services/movie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-movie-card',
  imports: [MatCardModule, MatIcon, MatIconButton, RouterLink, CommonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  @Input() movie!: Movie;
  @Output() deleteCard: EventEmitter<string> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private moviesService: MovieService,
    private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar) {

  }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  addItemToCart(movie: Movie) {
    this.cartService.addItem(movie);
    this.snackBar.open('Filme adicionado ao carrinho!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

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
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000
            });

            this.deleteCard.emit(this.movie.id);
          },
          error: (err) => {
            let msg = 'Não foi possível excluir o filme.';
            if (err.status == 401) {
              msg = 'Você não está autorizado a realizar a exclusão de um filme.'
            }

            this.snackBar.open(msg, 'Fechar', {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000
            });
          }
        })
      })
  }
}
