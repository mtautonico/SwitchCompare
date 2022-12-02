import {Component} from '@angular/core';
import {GetbrandsService} from "../../services/getbrands/getbrands.service";

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

  constructor(private getbrandsService: GetbrandsService) {
  }

  brands: Brand[] = [];

  async ngOnInit() {
    await (async () => {
      this.brands = await this.getbrandsService.getBrands();
      console.log(this.brands);
    })();
  }
}
