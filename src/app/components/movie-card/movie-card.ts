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
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-card',
  imports: [MatCardModule, MatIcon, MatIconButton, RouterLink, CommonModule, TranslateModule],
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
    private snackBar: MatSnackBar,
    private translate: TranslateService) {

  }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  addItemToCart(movie: Movie) {
    this.cartService.addItem(movie);
    this.snackBar.open(
      this.translate.instant('MESSAGES.ADD_CART'),
      this.translate.instant('MESSAGES.CLOSE'), {
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
            this.snackBar.open(
              this.translate.instant('MESSAGES.DELETE_MOVIE'),
              this.translate.instant('MESSAGES.CLOSE'), {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000
            });

            this.deleteCard.emit(this.movie.id);
          },
          error: (err) => {
            let msg = this.translate.instant('MESSAGES.DELETE_ERROR');
            if (err.status == 401) {
              msg = this.translate.instant('MESSAGES.DELETE_AUTH');
            }

            this.snackBar.open(
              msg,
              this.translate.instant('MESSAGES.CLOSE'), {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000
            });
          }
        })
      })
  }
}
