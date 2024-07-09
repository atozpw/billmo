import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private authService: AuthService
  ) { }

  find(id: string) {
    const url = `${environment.baseUrl}/v1/payments/${id}`;
    const headers = { 'Authorization': 'Bearer ' + this.authService.token };
    const options: HttpOptions = {
      url: url,
      headers: headers
    };
    const response = CapacitorHttp.get(options);
    return from(response);
  }

  store(data: any) {
    const url = `${environment.baseUrl}/v1/payments`;
    const headers = {
      'Authorization': `Bearer ${this.authService.token}`,
      'Content-Type': 'application/json'
    };
    const options: HttpOptions = {
      url: url,
      headers: headers,
      data: data
    };
    return from(CapacitorHttp.post(options));
  }

}
