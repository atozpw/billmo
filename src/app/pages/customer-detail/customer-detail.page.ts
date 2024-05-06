import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonItem, IonLabel, IonList, IonCheckbox, IonImg, IonSearchbar, IonModal, IonAvatar } from '@ionic/angular/standalone';
import { Customer } from 'src/app/interfaces/customer';
import { Bill } from 'src/app/interfaces/bill';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { BillService } from 'src/app/services/bill.service';
import { FormatCurrencyPipe } from 'src/app/pipes/format-currency.pipe';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
  standalone: true,
  imports: [FormatCurrencyPipe, IonSearchbar, IonImg, IonCheckbox, IonList, IonLabel, IonItem, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, IonModal, IonAvatar, CommonModule, FormsModule]
})
export class CustomerDetailPage implements OnInit {

  customer?: Customer;
  bills?: Bill[];

  customerId: string;
  billAmount: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private billService: BillService
  ) {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit() {
    this.getCustomer();
    this.getBills();
  }

  getCustomer() {
    this.customerService.find(this.customerId)
      .subscribe((response) => {
        this.customer = response.data.data;
      });
  }

  getBills() {
    this.billService.get(this.customerId)
      .subscribe((response) => {
        this.bills = response.data.data;
        this.calculateBillAmount(response.data.data);
      });
  }

  calculateBillAmount(data: any) {
    for (let i = 0; i < data.length; i++) {
      this.billAmount += parseInt(data[i].total);
    }
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }

}
