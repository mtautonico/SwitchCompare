import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIFetchService {

  constructor() {
  }

  async getBrands() {
    let response = await fetch('/api/brand');
    let json = await response.json();
    return json.data;
  }
  async getSwitches(brand: string) {
    let response = await fetch(`/api/brand/${brand}`);
    let json = await response.json();
    return json.data;
  }
}
