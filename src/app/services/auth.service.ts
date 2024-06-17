import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { arrayToString } from '../utilities/general';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username = ""
  userGroups:string[]=[]
  isLoggedIn=false;
  constructor(private dataService: DataService) { }

  login(){
    this.isLoggedIn=true;
    this.username='joamona@cgf.upv.es';
    this.userGroups=['topografo', 'admin'];
  }

  logout(){
    this.isLoggedIn=false;
    this.username=''
    this.userGroups=[];
  }

  getUsergroupsAsString(){
    return arrayToString(this.userGroups);
  }

}
