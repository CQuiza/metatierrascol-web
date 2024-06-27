import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {Subject} from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthUserModel } from '../models/authUserModel';
import { Message } from '../models/message';
import { manageServerErrors, sendMessages } from '../utilities/manageMessages';
import { StateEnum } from '../enumerations/stateEnum';
import { GlobalMessageService } from './global-message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUserModel: AuthUserModel= new AuthUserModel('',new Date('1500/01/01'),[],'');
  authUserMessages: Message[] = [];
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 
    'Authorization': 'Token ' + this.authUserModel.token });

  // to announce when the user has been authenticated.
  // The AuthUserModel class methosds are not included
  // in the object emited
  public authUserSubject = new Subject<AuthUserModel>();
  public authMessagesSubject = new Subject<Message[]>()
  public apiUrl = "";
  
  constructor(private httpClient:HttpClient, 
    private globalMessageService: GlobalMessageService, 
    private matSnackBar: MatSnackBar, private cookieService: CookieService) {
      const apiUrlCookieExists: boolean = cookieService.check('apiUrl');
      if (apiUrlCookieExists){
        this.apiUrl = this.cookieService.get('apiUrl');
      }else{
        this.cookieService.set('apiUrl', environment.apiUrl);
        this.apiUrl = environment.apiUrl;
      }
      const tokenCookieExists: boolean = cookieService.check('token');
      if (tokenCookieExists){
        this.authUserModel.token = this.cookieService.get('token');
        this.updateHeaders()
      }
    }

  setApiUrl(apiUrl:string){
    this.cookieService.set('apiUrl', apiUrl);
    this.apiUrl=apiUrl;
  }

  updateHeaders(){
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 
      'Authorization': 'Token ' + this.authUserModel.token });
  }

  announceAuthUserChange() {
    //only transmits properties not methods
    //You must create the AuthUserModel object manually
    //new AuthUserModel(response.username, response.expiry,response.groups, response.token);
    this.authUserSubject.next(this.authUserModel);
    this.authMessagesSubject.next(this.authUserMessages);
  }

  isValidToken(){
    if (this.authUserModel.getToken() == ''){
      sendMessages(StateEnum.info,'La sesión aún no ha sido iniciada en este dispositivo',this.globalMessageService);
      return;
    }
    this.httpClient.get<any>(environment.apiUrl + 'core/knox/is_valid_token/',
      {headers: this.headers, responseType : 'json', reportProgress: false}).subscribe(
        {
          next:response=>{
            //console.log(response)
            if (response.detail=='detail": "Invalid token.'){
              if (this.cookieService.check('token')){
                sendMessages(StateEnum.info,'El token no existe en el navegador',this.globalMessageService);
              }else{
                sendMessages(StateEnum.info,'El token no es válido. Inicie sesión',this.globalMessageService);
              }
            }
            this.authUserModel.username = response.username;
            this.authUserModel.groups = response.groups;
            this.authUserModel.isLoggedIn=true;
            this.announceAuthUserChange();
            sendMessages(StateEnum.success,'Sesión iniciada',this.globalMessageService);
          },
          error:error=>{
            manageServerErrors(error,this.globalMessageService);
          }
        }
    );
  }

  login(apiUrl:string, username:string, password:string){
    //this.isLoggedIn=true;
    //this.username='joamona@cgf.upv.es';
    //this.userGroups=['topografo', 'admin'];
    this.authUserMessages=[];
    this.httpClient.post<any>(apiUrl + 'core/knox/login/',
      {'username':username, 'password':password}).subscribe(
        {
          next:response=>{
            if (response.token == undefined){
              this.authUserMessages=sendMessages(StateEnum.info,'Las credenciales son correctas, pero se ha excedido el número máximo de tokens para ese usuario (10). Por favor cierre alguna sesión en otro dispositivo',this.globalMessageService, this.matSnackBar)             
              this.announceAuthUserChange();
              this.setApiUrl(apiUrl);//sets the new api url in the cookie and in the class
              return
            }
            //response contains only properties, not methods
            //doe to that I create an AuthUserModel manually
            this.authUserModel=new AuthUserModel(response.username, response.expiry,response.groups, response.token,true);
            this.cookieService.set('token', this.authUserModel.token);
            this.authUserMessages=sendMessages(StateEnum.success,'Sesión iniciada correctamente', this.globalMessageService, this.matSnackBar)
            this.updateHeaders();
            this.announceAuthUserChange();
            this.setApiUrl(apiUrl);
          },
          error:error=>{
            this.authUserMessages=manageServerErrors(error, this.globalMessageService,this.matSnackBar);
            this.announceAuthUserChange();
          }
        }
      );
    }
  logout(){
    this.httpClient.post<AuthUserModel>(this.apiUrl + 'core/knox/logout/',
      {}, {headers: this.headers, responseType : 'json', reportProgress: false}).subscribe(
        {
          next:response=>{
            //console.log(response)
            this.authUserModel= new AuthUserModel('',new Date('1500/01/01'),[],'',false);
            this.announceAuthUserChange();
            this.cookieService.delete('token');
          },
          error:error=>{
            console.log(error)
          }
        }
    );
  }
}
