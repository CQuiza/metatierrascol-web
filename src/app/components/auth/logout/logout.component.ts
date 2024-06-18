import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { BlankComponent } from '../blank/blank.component';
import { SidenavsService } from '../../../services/sidenavs.service';


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router:Router, 
    private sidenavsService:SidenavsService
  ){}
  logout(){
    this.authService.logout();
    this.sidenavsService.closeAppSidenavRight();
    this.router.navigate(['',{outlets: {right_sidenav:['blank']}}]);
  }
}
