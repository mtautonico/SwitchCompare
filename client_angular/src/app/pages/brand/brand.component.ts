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

interface HeaderTitles {
  brand: string;
  model: string;
  type: string;
  actuation_distance: string;
  bottom_distance: string;
  operating_force: string;
  bottom_force: string;
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
  // This is becoming a fucking disaster
  isSwitchesEmpty: boolean = true;
  currentSortDirectionIsAsc: boolean = true;
  currentSortField: string = 'model';
  lastSortField: string = 'model';
  headerTitles: {[index: string]:any} = {
    brand: "Brand",
    model: "Model ▼",
    type: "Type",
    actuation_distance: "Actuation Distance",
    bottom_distance: "Bottom Distance",
    operating_force: "Operating Force",
    bottom_force: "Bottom Force"
  }
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
      this.headerTitles[this.lastSortField] = this.headerTitles[this.lastSortField].slice(0, -2);
      this.headerTitles[key] = String(this.headerTitles[key] + " ▼");
      this.lastSortField = key;
    } else {
      this.currentSortField = key;
      this.switches = this.TabletoolsService.sortJSON(data, key, !this.currentSortDirectionIsAsc);
      if (this.currentSortDirectionIsAsc) {
        this.headerTitles[this.currentSortField] = this.headerTitles[this.currentSortField].replace("▼", "▲");
      } else {
        this.headerTitles[this.currentSortField] = this.headerTitles[this.currentSortField].replace("▲", "▼");
      }
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

