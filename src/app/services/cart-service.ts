import { computed, effect, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsArray: WritableSignal<Array<CartItem>> = signal<Array<CartItem>>([]);
  
  cartTotalPrice: Signal<number> = computed(() => {
    return this.cartItemsArray().reduce((totalAcum, item) => {
      return totalAcum + (item.quantity * item.movie.price);
    }, 0);
  });

  constructor() {
    const cartArrayStr = localStorage.getItem("cartArray");
    if (cartArrayStr) this.cartItemsArray.set(JSON.parse(cartArrayStr));

    effect(() => {
      localStorage.setItem("cartArray", JSON.stringify(this.cartItemsArray()));
    });
  }

  getTotalPrice() {
    return this.cartTotalPrice;
  }

  getTotalItems() {
    return computed(() => {
      return this.cartItemsArray().reduce((totalAcum, item) => {
        return totalAcum + item.quantity;
      }, 0);
    });
  }

  getAllItems() {
    return this.cartItemsArray.asReadonly();
  }

  clearCart() {
    this.cartItemsArray.set([]);
  }

  addItem(movie: Movie) {
    if (movie.availableInStock <= 0) return;

    const cartItemsArray = this.cartItemsArray();
    const itemIndex = cartItemsArray.findIndex((item) => item.movie.id === movie.id);
    if (itemIndex != -1) {
      const quantity = cartItemsArray[itemIndex].quantity;
      cartItemsArray[itemIndex].quantity = quantity < movie.availableInStock ? quantity + 1 : quantity;
    } else {
      cartItemsArray.push({ movie, quantity: 1 });
    }
    this.cartItemsArray.set([...cartItemsArray]);
  }

  removeItem(movie: Movie) {
    const cartItemsArray = this.cartItemsArray();
    const itemIndex = cartItemsArray.findIndex((item) => item.movie.id === movie.id);

    if (itemIndex != -1) {
      cartItemsArray[itemIndex].quantity--;
      if (cartItemsArray[itemIndex].quantity <= 0) {
        cartItemsArray.splice(itemIndex, 1);
      }
    }
    this.cartItemsArray.set([...cartItemsArray]);
  }
}