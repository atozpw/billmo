import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor() { }

  get(id: string) {
    const url = `${environment.baseUrl}/v1/customers/${id}/bills`;
    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTQ1ODI5MDEsInN1YiI6ImFkbWluIn0.aqigfem_1sqTZE2MiC0B5q3qD39-Rt8r4TLaDv_hnHQ' };
    const options: HttpOptions = {
      url: url,
      headers: headers
    };
    const response = CapacitorHttp.get(options);
    return from(response);
  }

}
