import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WATCH OUT';

  constructor(private router: Router, private loginservice: LoginService) {}

  navigate() {
    // save m'n formuliertje.

    this.router.navigate(['admin', 'movies']);
  }

  isLoggedIn() {
    return this.loginservice.isLoggedIn();
  }
}
