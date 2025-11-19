import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  userForm: FormGroup;
  emailError: string = "";
  passwordError: string = "Senha inválida";

  constructor(private snackBar: MatSnackBar, private router: Router) {
    this.userForm = new FormGroup({
      email: new FormControl,
      password: new FormControl(null, [Validators.required])
    })
  }

  updateEmailErrorMessage() {
    if (this.userForm.controls["email"].hasError('required')) {
      this.emailError = 'Campo e-mail deve ser preenchido';
    } else if (this.userForm.controls["email"].hasError('email')) {
      this.emailError = 'Campo e-mail inválido';
    } else {
      this.emailError = '';
    }
  }

    submitForm() {
    const email = this.userForm.get("email")?.value;
    const password = this.userForm.get("password")?.value;

  }}
