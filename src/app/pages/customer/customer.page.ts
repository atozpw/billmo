import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItem, IonInput, IonButton, CommonModule, FormsModule]
})
export class CustomerPage implements OnInit {

  keyword: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  searchCustomer() {
    this.router.navigate(['/customer-search'], { queryParams: { search: this.keyword } });
  }

}
