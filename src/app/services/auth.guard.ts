import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const requiredRole = route.data['role'] as string;
  // console.log(requiredRole);

  // const authService = inject(AuthenticationService);
  // const router = inject(Router);

  // return authService.user$.pipe(
  //   take(1),
  //   map(user => !!user && authService.hasRole(requiredRole)),
  //   tap(hasRole => {
  //     if (!hasRole) {
  //       router.navigate(['/login']); // Redirect if not authorized
  //     }
  //   })
  // );


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
