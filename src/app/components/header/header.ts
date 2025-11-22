import { Component, Input, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDrawer } from '@angular/material/sidenav';
import { CartService } from '../../services/cart-service';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLinkActive, RouterLink, MatButtonToggleModule, MatBadgeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  @Input() drawer!: MatDrawer;
  cartItemsCount: Signal<number>;

  constructor(private authService: AuthService, private cartService: CartService) {
    this.cartItemsCount = this.cartService.getTotalItems();
  }

  ngOnInit(): void {
    // const currentLang = localStorage.getItem("selectedLang");
    // this.translateService.use(currentLang ?? this.translateService.getCurrentLang());
  }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logoutCurrentUser() {
    this.authService.logout();
  }

  // changeLanguage(lang: string) {
  //   this.translateService.use(lang).subscribe(() => {
  //     localStorage.setItem("selectedLang", lang);
  //   });
  // }
}
