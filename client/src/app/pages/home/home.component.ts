import {Component} from '@angular/core';
import {APIFetchService} from "../../services/apifetch/apifetch.service";
import {TabletoolsService} from "../../services/tabletools/tabletools.service";

interface Brand {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {

  constructor(private APIFetchService: APIFetchService,
              private TabletoolsService: TabletoolsService) {
  }

  brands: Brand[] = [];

  async ngOnInit() {
    this.brands = this.TabletoolsService.sortJSON(await this.APIFetchService.getBrands(), 'name', true);
    console.log(this.brands);
  }
}
