import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthService } from './services/auth.service';
import { SidenavsService } from './services/sidenavs.service';
import { ShowForRolesDirective } from './directives/show-for-roles.directive';
import { ShowForRolesService } from './services/show-for-roles.service';
import { AuthUserModel } from './models/authUserModel';
import { GlobalMessageComponent } from './components/messages/global-message/global-message.component';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatNavList } from '@angular/material/list';
import { AppVersionComponent } from './components/app-version/app-version/app-version.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, 
    MatToolbarModule, MatSidenavModule, MatIconModule,
    ShowForRolesDirective, GlobalMessageComponent, MatTooltipModule, MatMenu, 
    MatMenuModule, MatNavList, AppVersionComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  title = 'metatierrascol-web';
  showMessages=false;
  @ViewChild('appDrawerLeft') appDrawerLeft: MatDrawer = {} as MatDrawer;
  @ViewChild('appDrawerRight') appDrawerRight: MatDrawer = {} as MatDrawer;

  authUserModel:AuthUserModel = new AuthUserModel('',new Date('1500/01/01'),[],'');

  constructor (private authService: AuthService, private sidenavsService: SidenavsService,
    private showForRolesService: ShowForRolesService){

    authService.authUserSubject.subscribe({
      next: (value) => {
        this.authUserModel=value;
      }
    })
    authService.isValidToken();
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

  getAllowedRoles(elementTemplateName:string):string[]{
    return this.showForRolesService.getAllowedRoles('app.component', elementTemplateName);
  }

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
