import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(
    private authService: AuthService
  ) { }

  all(id: string) {
    const url = `${environment.baseUrl}/v1/customers/${id}/bills`;
    const headers = { 'Authorization': 'Bearer ' + this.authService.token };
    const options: HttpOptions = {
      url: url,
      headers: headers
    };
    const response = CapacitorHttp.get(options);
    return from(response);
  }

}
