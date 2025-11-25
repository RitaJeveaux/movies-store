import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  emailError: string = "";
  passwordError: string = "";
  hide = true;

  toggleHide() {
    this.hide = !this.hide;
  }


  constructor(private snackBar: MatSnackBar, private authService: AuthService, private router: Router, private translate: TranslateService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  updateEmailErrorMessage() {
    if (this.loginForm.controls["email"].hasError('required')) {
      this.emailError = this.translate.instant('LOGIN.REQUIRED_EMAIL');
    } else if (this.loginForm.controls["email"].hasError('email')) {
      this.emailError = this.translate.instant('LOGIN.ERROR_EMAIL');
    } else {
      this.emailError = '';
    }
  }

  submitForm() {
    const email = this.loginForm.get("email")?.value;
    const password = this.loginForm.get("password")?.value;
    this.authService.loginUser(email, password).subscribe({
      next: (isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.snackBar.open(
            this.translate.instant('LOGIN.SUCCESS'),
            this.translate.instant('LOGIN.CLOSE'),
            {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000,
            }
          );

          this.router.navigate(['']);
        }
      },
      error: (err) => {
        this.snackBar.open(
          this.translate.instant('LOGIN.INVALID_EMAIL'),
          this.translate.instant('LOGIN.CLOSE'),
          {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 3000,
          }
        );
      }
    })
  }
}