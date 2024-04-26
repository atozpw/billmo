import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/angular/standalone';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.getBills();

    if (this.folder == 'inbox') {
      this.postPayment();
    }
  }

  getBills() {
    const url = '/v1/customers/100001/bills';
    const headers = {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTQxNTIyMTIsInN1YiI6ImFkbWluIn0.pelcKOt1p6ekQ98hCPUOAgTEFochi-DY3CwkMMUp5DY'
    };
    this.httpService.doGet(url, headers).subscribe((res: any) => {
      console.log(res);
    })
  }

  postPayment() {
    const url = '/v1/payments';
    const headers = {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTQxNTIyMTIsInN1YiI6ImFkbWluIn0.pelcKOt1p6ekQ98hCPUOAgTEFochi-DY3CwkMMUp5DY',
      'Content-Type': 'application/json'
    };
    const data = {
      'id': '2',
      'amount': '0',
      'bills': [
        { 'id': '1', 'amount': '0' },
        { 'id': '2', 'amount': '0' }
      ]
    };
    this.httpService.doPost(url, headers, data).subscribe((res: any) => {
      console.log(res);
    })
  }
}
