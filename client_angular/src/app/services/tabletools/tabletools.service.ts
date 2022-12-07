import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabletoolsService {

  constructor() {
  }

  //  Write a function to sort an array of json data by a given key with an optional direction
  sortJSON(data: any, key: string, asc: boolean) {
    // @ts-ignore
    return data.sort(function (a: any, b: any) {
      let x = a[key];
      let y = b[key];
      if (asc) {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }
      if (!asc) {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
    });
  }
}
