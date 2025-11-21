import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLinkActive, RouterLink, MatButtonToggleModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private authService: AuthService) { }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logoutCurrentUser() {
    this.authService.logout();
  }
}
