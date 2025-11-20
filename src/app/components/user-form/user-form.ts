import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  @Input() userForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<any>();

  emailError: string = "";
  passwordError: string = "Senha inválida";

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
    if (this.userForm.valid) {
      this.formSubmit.emit(this.userForm.value);
    }
  }
}
