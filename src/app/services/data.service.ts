import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthUserModel } from '../models/authUserModel';
import { Message } from '../models/message';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  authUserModel: AuthUserModel= new AuthUserModel('',new Date('1500/01/01'),[],'');
  authUserMessages: Message[] = [];
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 
    'Authorization': 'Token ' + this.authUserModel.token });

  // to announce when the user has been authenticated.
  // The AuthUserModel class methosds are not included
  // in the object emited

  authUserSub?:Subscription;

  constructor(private httpClient:HttpClient, private authService: AuthService) {
      this.authUserModel = this.authService.authUserModel;
      this.updateHeaders();
      //If the authentication changes, this service is updated
      this.authUserSub = this.authService.authUserSubject.subscribe({
        next: authUserModel => {
          this.authUserModel=authUserModel;
          this.updateHeaders();
        }
      });
    }

  updateHeaders(){
    if (this.authUserModel.getToken()!=''){
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 
        'Authorization': this.authUserModel.getToken()});
    }else{
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json'})
    }
  }

  /**
   * Gets data from the server
   * @param endPointUrl The url to get. eg: 'core/upload_file/'
   * @param getParams The get parameters. eg: new HttpParams({id:25, value:'556'})
   */
  get(endPointUrl:string, getParams:HttpParams=new HttpParams({})){
    return this.httpClient.get<any>(this.authUserModel.apiUrl + endPointUrl,
      {
        headers: this.headers, responseType : 'json', reportProgress: false,
        params: getParams
      })
  }

  /**
   * Modify data from the server
   * @param endPointUrl The url to get. eg: 'core/upload_file/'
   * @param postParams The get parameters. eg: new HttpParams({id:25, value:'556'})
   */
  post(endPointUrl:string, postParams:{}={}){
    return this.httpClient.post<any>(
      this.authUserModel.apiUrl + endPointUrl,
      postParams,
      {headers: this.headers, responseType : 'json', reportProgress: false})
  }
}
