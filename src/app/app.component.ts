import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { AuthService } from './services/auth.service';
import { MessageComponent } from './components/message/message.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, 
    MatToolbarModule, MatSidenavModule, MatIconModule,
    MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'metatierrascol-web';
  showMessages=false;
  @ViewChild('appDrawerLeft') appDrawerLeft: MatDrawer = {} as MatDrawer;
  @ViewChild('appDrawerRight') appDrawerRight: MatDrawer = {} as MatDrawer;

  constructor(private authService: AuthService){
    authService.login();
  }
  toggleAppDrawerLeft(){
    this.appDrawerLeft.toggle();
    if (this.appDrawerLeft.opened){this.appDrawerRight.close()}
  }
  toggleAppDrawerRight(){
    this.appDrawerRight.toggle();
    if (this.appDrawerRight.opened){this.appDrawerLeft.close()}
  }
  toggleShowMessages(){
    this.showMessages=!this.showMessages;
  }
  getUsername(){
    return this.authService.username;
  }
  getUsergroups(){
    return this.authService.getUsergroupsAsString();    
  }
  getUserLoggedIn(){return this.authService.isLoggedIn}
  logout(){this.authService.logout();}
  login(){this.authService.login()}
}
