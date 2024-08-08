import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const requiredRole = route.data['role'] as string;
  const router = inject(Router);
  const loggedUser = JSON.parse(localStorage['logininfo']);
  if (loggedUser != null && loggedUser.role === 'admin' && requiredRole == loggedUser.role) {
    return true;
  }
  else if (loggedUser != null && loggedUser.role === 'user' && requiredRole == loggedUser.role) {
    return true;
  }
  else {
    router.navigateByUrl('login');
    return false;
  }

};
