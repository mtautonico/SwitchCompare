import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {APIFetchService} from "../../services/apifetch/apifetch.service";
import {TabletoolsService} from "../../services/tabletools/tabletools.service";
import {NotfoundComponent} from "../notfound/notfound.component";

interface Switch {
  brand: string;
  model: string;
  type: string;
  actuation_distance: number;
  bottom_distance: number;
  operating_force: number;
  bottom_force: number;

}

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  brand: string | null | undefined;
  switches: Switch[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private APIFetchService: APIFetchService,
    private TabletoolsService: TabletoolsService
  ) {
  }

  parseFloat(value: Number) {
    return parseFloat(String(value));
  }
  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.brand = params.get("brandName")
    });
    // @ts-ignore
    this.switches = await this.APIFetchService.getSwitches(this.brand);
    console.log(this.switches)
  };
  public sortTable(data: any, key: string, direction: string) {
    this.switches = this.TabletoolsService.sortJSON(data, key, direction);
    console.log('The function was called');
  }
}

