import { Injectable } from '@angular/core';
import {
  CanDeactivate
} from '@angular/router';
import { PersonComponent } from './person/person.component';

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<PersonComponent> {
  canDeactivate(component: PersonComponent): boolean {
    return component.canDeactivate();
  }
}
