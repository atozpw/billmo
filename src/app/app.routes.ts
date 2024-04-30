import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'customer',
    loadComponent: () => import('./pages/customer/customer.page').then(m => m.CustomerPage)
  },
  {
    path: 'counter-status',
    loadComponent: () => import('./pages/counter-status/counter-status.page').then(m => m.CounterStatusPage)
  },
  {
    path: 'payment',
    loadComponent: () => import('./pages/payment/payment.page').then(m => m.PaymentPage)
  },
  {
    path: 'report',
    loadComponent: () => import('./pages/report/report.page').then(m => m.ReportPage)
  },
  {
    path: 'account',
    loadComponent: () => import('./pages/account/account.page').then(m => m.AccountPage)
  },
  {
    path: 'setting',
    loadComponent: () => import('./pages/setting/setting.page').then(m => m.SettingPage)
  },
  {
    path: 'payment/:id',
    loadComponent: () => import('./pages/payment-detail/payment-detail.page').then(m => m.PaymentDetailPage)
  },
  {
    path: 'customer-search',
    loadComponent: () => import('./pages/customer-search/customer-search.page').then(m => m.CustomerSearchPage)
  },
  {
    path: 'customer-detail',
    loadComponent: () => import('./pages/customer-detail/customer-detail.page').then(m => m.CustomerDetailPage)
  },
];
