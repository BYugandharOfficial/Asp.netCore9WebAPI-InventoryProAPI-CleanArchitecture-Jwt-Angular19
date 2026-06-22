import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { style } from '@angular/animations';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './login.component.css',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';
  password = '';
  rememberMe: boolean = false;
   
  ngOnInit(): void {
    const username = localStorage.getItem('username');

    if(username) {
      this.username = username;
      this.rememberMe = true;
    }
  }

  constructor(private authService: AuthService,  private router: Router) {}

  login() {

    const loginData = {
      userName: this.username,
      password: this.password
    };
     console.log(loginData)
    this.authService.login(loginData).subscribe({
      next: (response: any) => {
       
        localStorage.setItem('token', response.token);
        this.router.navigate(['/Dashboard']);
        alert('Login Successful');

       this.username = localStorage.getItem('username') || ''; {
       this.username = 'Admin';
    }



        if (this.rememberMe) {
    localStorage.setItem('rememberMe', 'true');
  } else {
    localStorage.removeItem('rememberMe');
  }
        
      },
      error: (err) => {
        console.error(err);
        alert('Login Failed');
      }
    });
  }
}
