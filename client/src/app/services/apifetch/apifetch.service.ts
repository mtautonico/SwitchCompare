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

  async getSwitches(brand?: string) {
    if (brand == null) {
      console.log(brand)
      let response = await fetch(`/api/switch/`);
      let json = await response.json();
      return json.data;
    } else {
      let response = await fetch(`/api/switch/${brand}`);
      let json = await response.json();
      return json.data;
    }
  }
}
