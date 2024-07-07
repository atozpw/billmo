import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonLabel, IonModal, IonAvatar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.page.html',
  styleUrls: ['./customer-search.page.scss'],
  standalone: true,
  imports: [IonLabel, IonInput, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonModal, IonAvatar, CommonModule, FormsModule]
})
export class CustomerSearchPage implements OnInit {

  customers: any;
  search: string = '';
  loading: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private customerService: CustomerService
  ) {
    this.search = this.activatedRoute.snapshot.queryParamMap.get('search') || '';
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.showLoading();
    this.customerService.all(this.search)
      .subscribe((response) => {
        this.hideLoading();
        this.customers = response.data.data;
      });
  }

  findCustomer(id: string) {
    this.router.navigate(['/customer', id]);
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      mode: 'ios'
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

}
