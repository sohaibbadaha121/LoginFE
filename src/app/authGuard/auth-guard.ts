import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token/token-service';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.token) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
