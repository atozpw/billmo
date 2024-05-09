import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: 'customer',
    loadComponent: () => import('./pages/customer/customer.page').then(m => m.CustomerPage),
    canActivate: [authGuard]
  },
  {
    path: 'customer-search',
    loadComponent: () => import('./pages/customer-search/customer-search.page').then(m => m.CustomerSearchPage),
    canActivate: [authGuard]
  },
  {
    path: 'customer/:id',
    loadComponent: () => import('./pages/customer-detail/customer-detail.page').then(m => m.CustomerDetailPage),
    canActivate: [authGuard]
  },
  {
    path: 'payment',
    loadComponent: () => import('./pages/payment/payment.page').then(m => m.PaymentPage),
    canActivate: [authGuard]
  },
  {
    path: 'payment/:id',
    loadComponent: () => import('./pages/payment-detail/payment-detail.page').then(m => m.PaymentDetailPage),
    canActivate: [authGuard]
  },
  {
    path: 'payment-success/:id',
    loadComponent: () => import('./pages/payment-success/payment-success.page').then( m => m.PaymentSuccessPage),
    canActivate: [authGuard]
  },
  {
    path: 'report',
    loadComponent: () => import('./pages/report/report.page').then(m => m.ReportPage),
    canActivate: [authGuard]
  },
  {
    path: 'account',
    loadComponent: () => import('./pages/account/account.page').then(m => m.AccountPage),
    canActivate: [authGuard]
  },
  {
    path: 'setting',
    loadComponent: () => import('./pages/setting/setting.page').then(m => m.SettingPage),
    canActivate: [authGuard]
  }
];
