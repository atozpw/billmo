import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  doGet(endpoint: string, headers: any = {}, params: any = {}) {
    const url = `${environment.apiHost}:${environment.apiPort}${endpoint}`;
    const options: HttpOptions = {
      url: url,
      headers: headers,
      params: params
    };
    return from(CapacitorHttp.get(options));
  }

  doPost(endpoint: string, headers: any = {}, data: any = []) {
    const url = `${environment.apiHost}:${environment.apiPort}${endpoint}`;
    const options: HttpOptions = {
      url: url,
      headers: headers,
      data: data
    };
    return from(CapacitorHttp.post(options));
  }

}
