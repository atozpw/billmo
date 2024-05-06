import { CanActivateFn } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
class PermissionsService {
  constructor(private authService: AuthService) { }
  canActivate(): boolean {
    return true;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
