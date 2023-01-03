import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIFetchService {

  // Gets all brands information
  async getBrands() {
    const response = await fetch('/api/brand');
    const json = await response.json();
    return json.data;
  }

  // Gets all switches from a specific brand
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
  // Gets a specific switch from a specific brand
  async getSwitch(brand: string, model: string) {
    const response = await fetch(`/api/switch/${brand}/${model}`);
    const json = await response.json();
    return json.data;
  }
}
