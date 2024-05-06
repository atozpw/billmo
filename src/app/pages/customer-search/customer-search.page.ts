import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService
  ) {
    this.search = this.activatedRoute.snapshot.queryParamMap.get('search') || '';
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.all(this.search)
      .subscribe((response) => {
        this.customers = response.data.data;
      });
  }

  findCustomer(id: string) {
    this.router.navigate(['/customer', id]);
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }

}
