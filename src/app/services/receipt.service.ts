import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(
    private authService: AuthService
  ) { }

  send(data: any) {
    const url = `${environment.baseUrl}/v1/receipt/whatsapp`;
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
