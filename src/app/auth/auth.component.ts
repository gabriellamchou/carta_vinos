import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode = true;
  isLoading = false;
  errorMsg: string | null = null;

  listaUsuarios: User[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (!form.valid) {
      return;
    }
    if (!this.loginMode) {
      this.authService.registro(
        form.value.email,
        form.value.username,
        form.value.password)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.isLoading = false;
          },
          error: (errorMsg) => {
            console.log(errorMsg);
            this.errorMsg = errorMsg;
            this.isLoading = false;
          }
        });
    }
  }

  fetchUsers() {
    this.authService.findAll()
      .subscribe({
        next: (response) => {
          this.listaUsuarios = response;
          console.log(response);

        },
        error: (error) => {
          console.log(error);
        }
      })
  }

}
