import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = '';

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

  async getToken() {
    const { value } = await Preferences.get({ key: 'auth' }) || '';
    const data = JSON.parse(value || '');
    this.token = data.token;
  }

}
