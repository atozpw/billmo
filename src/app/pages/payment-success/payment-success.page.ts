import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, CommonModule, FormsModule]
})
export class PaymentSuccessPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  buttonPrintReceipt() {

  }

  buttonSendReceipt() {

  }

  buttonClose() {
    this.router.navigate(['/payment']);
  }

}
