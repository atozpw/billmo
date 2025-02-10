import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate, formatNumber } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonCheckbox, IonNote, IonLabel, IonButton, IonModal, IonImg, IonAvatar, IonInput, ModalController } from '@ionic/angular/standalone';
import { CustomerService } from 'src/app/services/customer.service';
import { BillService } from 'src/app/services/bill.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { Bill } from 'src/app/interfaces/bill';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
  standalone: true,
  imports: [IonInput, IonAvatar, IonImg, IonModal, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonList, IonItem, IonCheckbox, IonNote, IonLabel, CommonModule, FormsModule]
})
export class PaymentDetailPage implements OnInit {

  customer?: Customer;
  bills?: Bill[];

  customerId: string = '';
  paymentId: string = '';
  billChecked: any = [];
  billTotal: number = 0;
  paymentTotal: number = 0;
  paymentReceived: number = 0;
  paymentReturn: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private customerService: CustomerService,
    private billService: BillService,
    private paymentService: PaymentService
  ) {
    this.customerId = this.route.snapshot.paramMap.get('id') || '000000';
  }

  ngOnInit(): void {
    this.getPaymentId();
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

  getPaymentId() {
    let prefix = formatDate(Date.now(), 'yyMMddHHmmss', 'en-US').toString();
    let mathRandom = Math.random().toString();
    let randomId = mathRandom.substring(mathRandom.length - 4)
    this.paymentId = prefix + randomId;
  }

  storePayment() {
    let paymentBills = [];

    for (let i = 0; i < this.billChecked.length; i++) {
      if (this.billChecked[i]) {
        paymentBills.push({
          id: this.bills?.[i].id,
          amount: this.bills?.[i].total
        });
      }
    }

    let data = {
      id: this.paymentId,
      amount: this.paymentTotal.toString(),
      bills: paymentBills
    }

    this.paymentService.store(data)
      .subscribe((response) => {
        if (response.status == 200) {
          this.modalCtrl.dismiss();
          this.router.navigate(['/payment-success', this.paymentId]);
        }
      });
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
    this.billTotal = sum;
    this.paymentTotal = sum + 5000;
    this.paymentReceived = sum + 5000;
  }

  calculatePaymentReturn() {
    this.paymentReturn = this.paymentReceived - this.paymentTotal;
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
