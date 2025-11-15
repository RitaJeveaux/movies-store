import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  emailError: string = "";
  passwordError: string = "Senha inválida.";

  constructor(private snackBar: MatSnackBar, private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  updateEmailErrorMessage() {
    if (this.loginForm.controls["email"].hasError('required')) {
      this.emailError = 'Campo e-mail deve ser preenchido';
    } else if (this.loginForm.controls["email"].hasError('email')) {
      this.emailError = 'Campo e-mail inválido';
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
            "Login realizado com sucesso!",
            "Fechar",
            {
              horizontalPosition: "end",
              verticalPosition: "top",
              duration: 3000,
            }
          );

          this.router.navigate(['']);
        }
      },
      error: (err) => {
        this.snackBar.open(
          "Login inválido. Por favor, digite credenciais válidas!",
          "Fechar",
          {
            horizontalPosition: "end",
            verticalPosition: "top",
            duration: 3000,
          }
        );
      }
    })
  }
}