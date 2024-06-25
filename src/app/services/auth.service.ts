import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken="Token theToken"
  username = ""
  userGroups:string[]=[]
  isLoggedIn=false;
  constructor(private httpClient:HttpClient) { 
  }

  login(){
    //this.isLoggedIn=true;
    //this.username='joamona@cgf.upv.es';
    //this.userGroups=['topografo', 'admin'];
    this.httpClient.post(environment.apiUrl + 'core/knox/login/',
      {'username':'admin', 'password':'admin'}).subscribe(
        data => {
          console.log(data)
        },
        error => {
          console.log(error)
        }
      )
    
    
    }
  logout(){
    this.isLoggedIn=false;
    this.username=''
    this.userGroups=[];
  }

}
