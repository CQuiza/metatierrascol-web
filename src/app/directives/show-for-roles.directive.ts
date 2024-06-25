import { Directive, Input, OnDestroy, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { isAnyOfTheseValuesInArray } from '../utilities/general';


@Directive({
  selector: '[showForRoles]',
  standalone: true
})
export class ShowForRolesDirective implements OnInit{
  @Input('showForRoles') allowedRoles?: any[]

  constructor(private authService: AuthService, private viewContainerRef: ViewContainerRef, 
    private templateRef: TemplateRef<any>) { }

  ngOnInit(): void {
    console.log('allowed roles: ', this.allowedRoles?.flat(1));
    console.log('Is: ',isAnyOfTheseValuesInArray(this.authService.userGroups, this.allowedRoles?.flat(1)))
    if (isAnyOfTheseValuesInArray(this.authService.userGroups, this.allowedRoles?.flat(1))){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }else{
      console.log('borrando')
      this.viewContainerRef.clear();
    }
  }
}
