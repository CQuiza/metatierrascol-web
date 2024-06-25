/**
 * This function keeps, in only one point, who is able to see what in a template.
 * 
 * Returns the list of groups that are able to view a component template
 * element, as a menu element or button.
 * 
 * You must set the the elementTemplateName in the template,
 * in the showForRoles directive. Eg *showForRoles="showForRoles('map')".
 * --> map is the elementTemplateName to show - hide, depending on
 * the groups, or roles, of the user.
 * In the component you must have a method called showForRoles:
 *  showForRoles(elementTemplateName): string[]
 *      return showForRolesInComponent('app.component', elementTemplateName)
 * In showForRolesInComponent you manually set the name of the component, the
 * name of the element template, and the groups that are able to see
 * the component template 
 * 
 * @param {string} componentName - the name of the component 
 * @param {string} elementTemplateName - the element template name
 * @returns {string[]} - Eg: ['admin', 'surveyor']
 */
export function showForRolesInComponent(componentName:string, elementTemplateName:string): string[]{
    switch(componentName){
        case 'app.component':{
            switch(elementTemplateName){
                case 'administracion':{return ['admin']; break;}
                default: {return []; break;}
            }
        }
        default: {return [];break;}
    }

}