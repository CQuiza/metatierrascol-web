import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DonwloadAppVersionComponent } from '../donwload-app-version/donwload-app-version.component';
import { UploadAppVersionComponent } from '../upload-app-version/upload-app-version.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ShowForRolesService } from '../../../services/show-for-roles.service';
import { ShowForRolesDirective } from '../../../directives/show-for-roles.directive';

@Component({
  selector: 'app-app-version',
  standalone: true,
  imports: [RouterLink, DonwloadAppVersionComponent, UploadAppVersionComponent,
    HeaderComponent, FooterComponent, ShowForRolesDirective
  ],
  templateUrl: './app-version.component.html',
  styleUrl: './app-version.component.scss'
})
export class AppVersionComponent {
  constructor(public showForRolesService:ShowForRolesService){}
  
  showForRoles(elementTemplateName:string): string[]{
    return this.showForRolesService.getAllowedRoles('app.version.component',elementTemplateName)
  }
}
