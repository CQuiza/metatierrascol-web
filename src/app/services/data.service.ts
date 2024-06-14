import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
}
