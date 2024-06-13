import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, MatToolbarModule, MatSidenavModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'metatierrascol-web';
  @ViewChild('appDrawerLeft') appDrawerLeft: MatDrawer = {} as MatDrawer;
  @ViewChild('appDrawerRight') appDrawerRight: MatDrawer = {} as MatDrawer;
  constructor(){}
  toggleAppDrawerLeft(){
    this.appDrawerLeft.toggle();
    if (this.appDrawerLeft.opened){this.appDrawerRight.close()}
  }
  toggleAppDrawerRight(){
    this.appDrawerRight.toggle();
    if (this.appDrawerRight.opened){this.appDrawerLeft.close()}
  }

}
