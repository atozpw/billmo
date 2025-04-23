import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@capacitor/clipboard';
import { Customer } from 'src/app/interfaces/customer';
import { Bill } from 'src/app/interfaces/bill';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { BillService } from 'src/app/services/bill.service';
import { FormatCurrencyPipe } from 'src/app/pipes/format-currency.pipe';
import { LoadingController } from '@ionic/angular';
import { BillDetailComponent } from 'src/app/components/bill-detail/bill-detail.component';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  ModalController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { copy } from 'ionicons/icons';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
  standalone: true,
  imports: [
    FormatCurrencyPipe,
    IonList,
    IonLabel,
    IonItem,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    CommonModule,
    FormsModule
  ]
})
export class CustomerDetailPage implements OnInit {

  customer?: Customer;
  bills?: Bill[];

  customerId: string;
  billAmount: number = 0;
  isModalBillOpen = false;

  loading: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private billService: BillService
  ) {
    addIcons({ copy });

    this.customerId = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit() {
    this.getCustomer();
    this.getBills();
  }

  async getCustomer() {
    await this.showLoading();
    this.customerService.find(this.customerId)
      .subscribe((response) => {
        this.hideLoading();
        this.customer = response.data.data;
      });
  }

  getBills() {
    this.billService.all(this.customerId)
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

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      mode: 'ios'
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: BillDetailComponent,
      breakpoints: [0, 0.75],
      initialBreakpoint: 0.75
    });
    modal.present();
  }

  async copyCustomerId() {
    await Clipboard.write({
      string: this.customerId
    });

    const toast = await this.toastCtrl.create({
      message: 'Nomor Pelanggan telah disalin',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

}
