import { Routes } from '@angular/router';
import { HelpComponent } from './components/help/help.component';
import { AboutComponent } from './components/about/about.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { BaunitComponent } from './components/baunit/baunit/baunit.component';
import { PartyComponent } from './components/party/party/party.component';
import { SourceComponent } from './components/source/source/source.component';
import { ImageComponent } from './components/source/image/image.component';
import { AppUserComponent } from './components/auth/app-user/app-user.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { YouDontHavePermissionComponent } from './components/auth/you-dont-have-permission/you-dont-have-permission.component';
import { belongsToGroupGuard } from './guards/belongs-to-group.guard';
import { BlankComponent } from './components/auth/blank/blank.component';
import { RemoveSessionsComponent } from './components/auth/remove-sessions/remove-sessions.component';
import { AppVersionComponent } from './components/app-version/app-version/app-version.component';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'help', component:HelpComponent},
    {path: 'about', component:AboutComponent},
    {path: 'map', component:MapComponent},
    {path: 'home', component:HomeComponent},
    {path: 'app_user', component:AppUserComponent},
    {path: 'login', component:LoginComponent},
    {path: 'logout', component:LogoutComponent},
    {path: 'remove_sessions',component:RemoveSessionsComponent},
    {path: 'app_version', component: AppVersionComponent},

    {path: 'baunit', component:BaunitComponent, outlet:'right_sidenav',
        canActivate:[belongsToGroupGuard],
        data:{allowedGroups: ['topografo']}
    },
    {path: 'party', canActivate:[isLoggedInGuard], component:PartyComponent, outlet:'right_sidenav'},
    {path: 'source', canActivate:[isLoggedInGuard], component:SourceComponent, outlet:'right_sidenav'},
    {path: 'image', canActivate:[isLoggedInGuard], component:ImageComponent, outlet:'right_sidenav'},
    {path: 'you_dont_have_permission', component:YouDontHavePermissionComponent, outlet:'right_sidenav'},
    {path: 'blank', component:BlankComponent, outlet:'right_sidenav'}
];
