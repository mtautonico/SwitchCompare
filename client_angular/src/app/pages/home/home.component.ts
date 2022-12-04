import {Component} from '@angular/core';
import {APIFetchService} from "../../services/apifetch/apifetch.service";

interface Brand {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private APIFetchService: APIFetchService) {
  }

  brands: Brand[] = [];

  async ngOnInit() {
    this.brands = await this.APIFetchService.getBrands();
    console.log(this.brands);
  }
}
