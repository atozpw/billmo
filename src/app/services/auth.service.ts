import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpHeaders, HttpOptions } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    let auth;
    const { value } = await Preferences.get({ key: 'auth' });
    if (value) auth = JSON.parse(value);
    if (auth) {
      this.token = auth.token;
      this.isAuthenticated = true;
    }
  }

  storeAuthentication(value: any) {
    Preferences.set({ key: 'auth', value: JSON.stringify(value) });
    this.isAuthenticated = true;
    this.token = value.token;
  }

}
