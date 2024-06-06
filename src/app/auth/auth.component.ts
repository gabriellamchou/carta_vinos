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

  listaUsuarios: User[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit (form: NgForm) {
    console.log(form.value);
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
