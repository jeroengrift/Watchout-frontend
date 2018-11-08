import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private accountname: String;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private router: Router, private loginservice: LoginService, private movieservice: MovieService) { }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.loginservice.isLoggedIn();
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['']);
  }

  login() {
    const ingetypteUser = this.loginForm.controls['username'].value;
    const ingetyptePw = this.loginForm.controls['password'].value;
    const authorized = ingetypteUser == 'admin' && ingetyptePw == 'wachtwoord';
    
    if(!authorized) {
      alert("Wrong credentials")
    }

    if(authorized) {
      this.accountname = ingetypteUser;
      console.log(this.accountname);
      localStorage.setItem('loggedIn', String(Math.random() * 10000));
      
      // alleen maar om even met headers te spelen.
      this.movieservice.getMovies().subscribe();
          }
  }
}
