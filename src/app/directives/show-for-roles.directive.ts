import { Directive, Input, OnDestroy, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { isAnyOfTheseValuesInArray } from '../utilities/general';

/**
 * Show - hide an element template, depending of the groups of the user.
 * Eg:
 *  <button *showForRoles="showForRoles('admin-menu')" cdkMenuItem ...>Admin </button>
 * 
 * The component method showForRoles(elementTemplateName) must return the user groups. Eg:
 *  ['surveyor', 'admin']
 * 
 * You can use this directive in without the showForRoles component method:
 *  *showForRoles="['surveyor', 'admin']"
*/

@Directive({
  selector: '[showForRoles]',
  standalone: true
})
export class ShowForRolesDirective implements OnInit{
  @Input('showForRoles') allowedRoles?: any[]// the allowed roles specified 
                                          //in the template. Eg ['surveyor', 'admin']

  constructor(private authService: AuthService, private viewContainerRef: ViewContainerRef, 
    private templateRef: TemplateRef<any>) { }

  ngOnInit(): void {
    this.authService.authUserSubject.subscribe({
      next: value => {
        if (isAnyOfTheseValuesInArray(this.authService.authUserModel.groups, this.allowedRoles?.flat(1))){
          /**
           * Keeps the element of the template 
           * this.allowedRoles?.flat(1) gets an array from the allowedRoles object*/
          //console.log('Creating',this.authService.authUserModel.groups, this.allowedRoles?.flat(1))
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }else{
          /**removes the element of the template */
          //console.log('Removing',this.authService.authUserModel.groups, this.allowedRoles?.flat(1))
          this.viewContainerRef.clear();
        }
      }
    })
  }
}
