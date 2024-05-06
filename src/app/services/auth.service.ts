import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpHeaders, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = '';

  isAuthenticated: boolean = false;

  constructor() { }

  login(data: any = {}) {
    const url = `${environment.baseUrl}/v1/login`;
    const headers: HttpHeaders = {
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

  async authenticated() {
    const { value } = await Preferences.get({ key: 'auth' });
    const data = JSON.parse(value || '');

    if (data) {
      this.token = data.token;
      this.isAuthenticated = true;
    }
  }

}
