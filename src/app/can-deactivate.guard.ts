import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, } from '@angular/router';
import { ComponentCanDeactivate } from './dialog/componentCanDeactivate';


@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {

  canDeactivate(component: ComponentCanDeactivate): boolean {

    if (!component.canDeactivate()) {
      if (confirm('You have unsaved changes! If you leave, your changes will be lost.')) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

}
