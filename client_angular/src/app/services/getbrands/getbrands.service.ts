import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetbrandsService {

  constructor() {
  }

  async getBrands() {
    let response = await fetch('/api/brand');
    let json = await response.json();
    return json.data;
  }
}
