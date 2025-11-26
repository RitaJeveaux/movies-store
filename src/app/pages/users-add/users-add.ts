import { Component } from '@angular/core';
import { UserForm } from '../../components/user-form/user-form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-users-add',
  imports: [UserForm, TranslateModule],
  templateUrl: './users-add.html',
  styleUrl: './users-add.css',
})
export class UsersAdd {
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.userForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  handleUserSubmit(user: Omit<User, 'id'>) {
    this.userService.addUser(user).subscribe({
      next: () => {
        this.snackBar.open('User created successfully!', 'Close', {
          horizontalPosition: "center",
          verticalPosition: "top", duration: 3000
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackBar.open(`Error creating user: ${err.message}`, 'Close', {
          horizontalPosition: "center",
          verticalPosition: "top", duration: 5000
        });
      }
    });
  }
}
