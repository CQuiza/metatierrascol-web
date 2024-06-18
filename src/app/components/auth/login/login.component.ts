import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService:AuthService, private router:Router){}
  login(){
    this.authService.login();
    this.router.navigate(['',{outlets: {right_sidenav:['baunit']}}]);
  }
}
