import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.userLoggedChanged
      .subscribe({
        next: (userLoggedChanged) => {
          this.isLoggedIn = userLoggedChanged;
        }
      })
  }

  onLogOut() {
    this.isLoggedIn = false;
    this.router.navigate(["auth"]);
  }

}
