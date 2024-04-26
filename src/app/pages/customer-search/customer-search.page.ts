import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonLabel, IonModal, IonAvatar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.page.html',
  styleUrls: ['./customer-search.page.scss'],
  standalone: true,
  imports: [IonLabel, IonInput, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonModal, IonAvatar, CommonModule, FormsModule]
})
export class CustomerSearchPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  detail() {
    this.router.navigate(['/customer-detail']);
  }

}
