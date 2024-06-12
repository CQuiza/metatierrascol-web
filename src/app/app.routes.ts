import { Routes } from '@angular/router';
import { HelpComponent } from './components/help/help.component';
import { AboutComponent } from './components/about/about.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { BaunitComponent } from './components/baunit/baunit/baunit.component';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'help', component:HelpComponent},
    {path: 'about', component:AboutComponent},
    {path: 'map', component:MapComponent},
    {path: 'home', component:HomeComponent},
    {path: 'baunit', component:BaunitComponent, outlet:'right-sidenav'},
];
