import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  username = ""
  usergroups: string[]=[]
  userLoggedIn=false;
  constructor(private dataService: DataService) { }
  login(){
    this.userLoggedIn=true;
    this.username='joamona@cgf.upv.es';
    this.usergroups=['admin','topografo'];
  }
  isLoggedIn(){
    this.userLoggedIn=true;
    this.username='joamona@cgf.upv.es';
    this.usergroups=['admin','topografo'];     
  }
  logout(){
    this.userLoggedIn=false;
    this.username=''
    this.usergroups=[];
  }

}
