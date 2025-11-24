import { Component, OnInit, signal, Signal } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart-service';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButtonModule } from '@angular/material/button';
import { Movie } from '../../models/movie';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [ MatListModule, MatIcon, MatIconButton, CurrencyPipe, MatButtonModule ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartArray: Signal<Array<CartItem>> = signal<Array<CartItem>>([]);

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartArray = this.cartService.getAllItems();
    console.log('Cart (ngOnInit):', this.cartArray());
  }

  getTotalPrice(): Signal<number> { // Alterar o tipo de retorno para Signal<number>
    return this.cartService.getTotalPrice();
  }

  addItemToCart(movie: Movie) {
    this.cartService.addItem(movie);
    console.log('Cart (addItemToCart):', this.cartArray());
  }

  removeItemFromCart(movie: Movie) {
    this.cartService.removeItem(movie);
    console.log('Cart (removeItemFromCart):', this.cartArray());
  }

  clearCart() {
    this.cartService.clearCart();
    console.log('Cart (clearCart):', this.cartArray());
  }

  checkout() {
    // Lógica para finalizar a compra será implementada aqui
    console.log('Checkout in progress...');
    console.log('Cart (checkout):', this.cartArray());
  }
}