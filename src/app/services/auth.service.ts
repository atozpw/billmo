import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(data: any = {}) {
    const url = `${environment.baseUrl}/v1/login`;
    const headers = {
      'Content-Type': 'application/json'
    };
    const options: HttpOptions = {
      url: url,
      headers: headers,
      data: data
    };
    return from(CapacitorHttp.post(options));
  }

  register() {

  }
}
