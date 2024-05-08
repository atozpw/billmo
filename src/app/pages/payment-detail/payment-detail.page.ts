import { Component, OnInit } from '@angular/core';
import { CommonModule, formatNumber } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonCheckbox, IonNote, IonLabel, IonButton, IonModal, IonImg, IonAvatar, IonInput } from '@ionic/angular/standalone';
import { CustomerService } from 'src/app/services/customer.service';
import { BillService } from 'src/app/services/bill.service';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { Bill } from 'src/app/interfaces/bill';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
  standalone: true,
  imports: [IonInput, IonAvatar, IonImg, IonModal, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonList, IonItem, IonCheckbox, IonNote, IonLabel, CommonModule, FormsModule]
})
export class PaymentDetailPage implements OnInit {

  customerId: string;
  customer?: Customer;
  bills?: Bill[];
  billChecked: any = [];
  paymentTotal: number = 0;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private billService: BillService
  ) {
    this.customerId = this.route.snapshot.paramMap.get('id') || '000000';
  }

  ngOnInit(): void {
    this.getCustomer();
    this.getBills();
  }

  getCustomer(): void {
    this.customerService.find(this.customerId)
      .subscribe((customer) => {
        this.customer = customer.data.data;
      });
  }

  getBills(): void {
    this.billService.all(this.customerId)
      .subscribe((bills) => {
        this.bills = bills.data.data;
      });
  }

  test() {
    const a = this.bills?.[0];
    console.log(a?.total);
  }

  changeChecked(index: number) {
    if (this.billChecked[index]) {
      for (let i = 0; i < index; i++) {
        this.billChecked[i] = true;
      }
    }
    else {
      const length = this.bills?.length || 0;
      for (let i = index; i < length; i++) {
        this.billChecked[i] = false;
      }
    }
    this.sumPaymentTotal();
  }

  sumPaymentTotal() {
    let sum = 0;
    for (let i = 0; i < this.billChecked.length; i++) {
      if (this.billChecked[i]) {
        sum += parseInt(this.bills?.[i].total || '0');
      }
    }
    this.paymentTotal = sum;
  }

  formatNumber(value: number): string {
    return formatNumber(value, 'en-US');
  }

  formatNumberFromString(value: string): string {
    return formatNumber(parseInt(value), 'en-US');
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }

}
