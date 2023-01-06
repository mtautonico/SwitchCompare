import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ConsoleToggleService {

  disableConsoleInProduction(): void {
    if (environment.production) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
      console.log = function (): void { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
      console.debug = function (): void { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
      console.warn = function (): void { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
      console.info = function (): void { };
    }
  }
}
