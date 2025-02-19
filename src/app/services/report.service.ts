import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private authService: AuthService
  ) { }

  all(date: string) {
    const url = `${environment.baseUrl}/v1/reports?date=${date}`;
    const headers = { 'Authorization': 'Bearer ' + this.authService.token };
    const options: HttpOptions = {
      url: url,
      headers: headers
    };
    const response = CapacitorHttp.get(options);
    return from(response);
  }

}
