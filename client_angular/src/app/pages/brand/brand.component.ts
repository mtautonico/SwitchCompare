import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {APIFetchService} from "../../services/apifetch/apifetch.service";
import {TabletoolsService} from "../../services/tabletools/tabletools.service";

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
  brand: string | null = "";
  switches: Switch[] = [];
  loaded: boolean = false;
  isSwitchesEmpty: boolean = true;
  currentSortDirectionIsAsc: boolean = true;
  currentSortField: string = 'model';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private APIFetchService: APIFetchService,
    private TabletoolsService: TabletoolsService
  ) {
  }

  //  Sort the table by a given table field
  public sortTable(data: any, key: string) {
    if (this.currentSortField !== key) {
      this.currentSortField = key;
      this.switches = this.TabletoolsService.sortJSON(data, key, true);
      this.currentSortDirectionIsAsc = true;
    } else {
      this.currentSortField = key;
      this.switches = this.TabletoolsService.sortJSON(data, key, !this.currentSortDirectionIsAsc);
      this.currentSortDirectionIsAsc = !this.currentSortDirectionIsAsc;
    }
    console.log(this.currentSortDirectionIsAsc)
  }


// Angular doesn't like parseFloat idk why so I have to do this
  parseFloat(value: Number) {
    return parseFloat(String(value));
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.brand = params.get("brandName")
    });
    // @ts-ignore
    this.switches = await this.APIFetchService.getSwitches(this.brand);
    if (this.switches.length === 0) {
      this.isSwitchesEmpty = true;
    } else {
      this.isSwitchesEmpty = false;
    }
    // Sort the table by model when the page is loaded
    this.switches = this.TabletoolsService.sortJSON(this.switches, 'model', true);
    console.log(this.switches)
    this.loaded = true;
  };
}

