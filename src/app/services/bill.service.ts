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
    const headers = {'Authorization': 'Bearer '};
    const options: HttpOptions = {
      url: url,
      headers: headers
    };
    return from(CapacitorHttp.get(options));
  }

}
