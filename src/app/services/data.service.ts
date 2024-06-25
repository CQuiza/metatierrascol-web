import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { 

  }
  get(view_url:string, params:{}={}){
  
  }
  downloadFile(view_url:string, params:{}={}){

  }

  public get authToken(): string {
    return 'Token ' + this._authToken;
  }
  public set authToken(value: string) {
    this._authToken = value;
  }
}
