import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIFetchService {

  async getBrands() {
    const response = await fetch('/api/brand');
    const json = await response.json();
    return json.data;
  }

  async getSwitches(brand?: string) {
    if (brand == null) {
      console.log(brand)
      const response = await fetch(`/api/switch/`);
      const json = await response.json();
      return json.data;
    } else {
      const response = await fetch(`/api/switch/${brand}`);
      const json = await response.json();
      return json.data;
    }
  }
}
