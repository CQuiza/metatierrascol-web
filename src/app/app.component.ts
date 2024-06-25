import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { AuthService } from './services/auth.service';
import { MessageComponent } from './components/message/message.component';
import { SidenavsService } from './services/sidenavs.service';
import { ShowForRolesDirective } from './directives/show-for-roles.directive';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, 
    MatToolbarModule, MatSidenavModule, MatIconModule,
    MessageComponent, ShowForRolesDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  title = 'metatierrascol-web';
  showMessages=false;
  @ViewChild('appDrawerLeft') appDrawerLeft: MatDrawer = {} as MatDrawer;
  @ViewChild('appDrawerRight') appDrawerRight: MatDrawer = {} as MatDrawer;

  constructor (private authService: AuthService, private sidenavsService: SidenavsService){
    authService.login();
  }
  toggleAppDrawerLeft(){
    this.sidenavsService.toggleAppDrawerLeft();
  }
  toggleAppDrawerRight(){
    this.sidenavsService.toggleAppDrawerRight();
  }
  toggleShowMessages(){
    this.showMessages=!this.showMessages;
  }
  getUsername(){
    return this.authService.username;
  }
  getUsergroups(){
    return this.authService.userGroups.join(', ');    
  }
  getUserLoggedIn(){return this.authService.isLoggedIn}

  ngAfterViewInit(): void {
    /**
     * After the view is completed I can get the elements
     * and put them into the service, in order to be
     * available for the rest of the components
     */
    this.sidenavsService.setAppDrawerLeft(this.appDrawerLeft);
    this.sidenavsService.setAppDrawerRight(this.appDrawerRight);
  }
}
