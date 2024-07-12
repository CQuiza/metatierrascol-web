import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ShowForRolesService } from '../../../services/show-for-roles.service';
import { ShowForRolesDirective } from '../../../directives/show-for-roles.directive';

@Component({
  selector: 'app-last-app-version',
  standalone: true,
  imports: [RouterLink, 
    HeaderComponent, FooterComponent, ShowForRolesDirective
  ],
  templateUrl: './last-app-version.component.html',
  styleUrl: './last-app-version.component.scss'
})
export class LastAppVersionComponent implements OnInit{
  constructor(public showForRolesService:ShowForRolesService,
    public cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    console.log('detectando')
    this.cdr.detectChanges();
  }
  
  showForRoles(elementTemplateName:string): string[]{
    console.log(this.showForRolesService.getAllowedRoles('app.version.component',elementTemplateName))
    return this.showForRolesService.getAllowedRoles('app.version.component',elementTemplateName)
  }
}
