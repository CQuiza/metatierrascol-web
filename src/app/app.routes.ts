import { Routes } from '@angular/router';
import { HelpComponent } from './components/help/help.component';
import { AboutComponent } from './components/about/about.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { BaunitComponent } from './components/baunit/baunit/baunit.component';
import { PartyComponent } from './components/party/party/party.component';
import { SourceComponent } from './components/source/source/source.component';
import { ImageComponent } from './components/source/image/image.component';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'help', component:HelpComponent},
    {path: 'about', component:AboutComponent},
    {path: 'map', component:MapComponent},
    {path: 'home', component:HomeComponent},
    {path: 'baunit', component:BaunitComponent, outlet:'right_sidenav'},
    {path: 'party', component:PartyComponent, outlet:'right_sidenav'},
    {path: 'source', component:SourceComponent, outlet:'right_sidenav'},
    {path: 'image', component:ImageComponent, outlet:'right_sidenav'},
];
