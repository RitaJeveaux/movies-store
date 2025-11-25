import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, TranslateModule, MatIconModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  @Input() userForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<any>();

  public hide = true;
  emailError: string = "";
  passwordError: string = "";

  constructor(private translate: TranslateService) { }

  updateEmailErrorMessage() {

    if (this.userForm.controls["email"].hasError('required')) {
      this.emailError = this.translate.instant('FORM.ERRORS.EMAIL_REQUIRED');
      return;
    }

    if (this.userForm.controls["email"].hasError('email')) {
      this.emailError = this.translate.instant('FORM.ERRORS.EMAIL_INVALID');
      return;
    }
    
    this.emailError = '';
  }

  updatePasswordErrorMessage() {
    const control = this.userForm.controls['password'];
    if (control.hasError('required')) {
      this.passwordError = this.translate.instant('VALIDATION.REQUIRED');
      return;
    }   
    this.passwordError = this.translate.instant('FORM.ERRORS.PASSWORD_INVALID');
  }

  submitForm() {  
    if (this.userForm.invalid) {
      this.updateEmailErrorMessage();
      this.updatePasswordErrorMessage();
      return;
    }
    this.formSubmit.emit(this.userForm.value);
  }
}
