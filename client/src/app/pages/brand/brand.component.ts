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
  styleUrls: ['./brand.component.less']
})
export class BrandComponent {
  brand: string | null = "";
  switches: Switch[] = [];
  loaded: boolean = false;
  isSwitchesEmpty: boolean = true;
  currentSortDirectionIsAsc: boolean = true;
  currentSortField: string = 'model';
  lastSortField: string = 'model';
  headerSort: any = {
    brand: null,
    model: null,
    type: null,
    actuation_distance: null,
    bottom_distance: null,
    operating_force: null,
    bottom_force: null
  }
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private APIFetchService: APIFetchService,
    private TabletoolsService: TabletoolsService
  ) {
  }

  //  Sort the table by a given table field
  // TODO: Label this disaster
  public sortTable(data: any, key: string) {
    if (this.currentSortField !== key) {
      this.currentSortField = key;
      this.switches = this.TabletoolsService.sortJSON(data, key, true);
      this.currentSortDirectionIsAsc = true;
      this.headerSort[this.lastSortField] = null;
      this.headerSort[key] = "asc";
      this.lastSortField = key;
    } else {
      this.switches = this.TabletoolsService.sortJSON(data, key, !this.currentSortDirectionIsAsc);
      if (this.currentSortDirectionIsAsc) {
        this.headerSort[this.currentSortField] = 'desc'
        } else {
          this.headerSort[this.currentSortField] = 'asc';
      }
      this.currentSortDirectionIsAsc = !this.currentSortDirectionIsAsc;
    }
    console.log(this.currentSortDirectionIsAsc)
  }


// Angular doesn't like parseFloat idk why so I have to do this
  parseFloat(value: Number) {
    return parseFloat(String(value));
  }


  // TODO: Make a function to filter through the data and set said filtered data to a separate variable


  // We need the brand in case theres a situation where 2 brands have the same model name
  compareSwitch(selectedBrand: string, selectedSwitch: string) {

  }

  // TODO: Label this disaster too
  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.brand = params.get("brandName")
    });
    if (history.state.data != undefined) {
      for (let i = 0; i < history.state.data.length; i++) {
        this.switches.push(await this.APIFetchService.getSwitches(history.state.data[i]));
      }
      this.switches = this.switches.flat();
      console.log(this.switches)
      console.log("triggered a")
    } else if (this.brand == undefined) {
      this.switches = await this.APIFetchService.getSwitches();
      console.log("triggered b")
    } else {
      this.switches = await this.APIFetchService.getSwitches(this.brand);
      console.log("triggered c")
    }
    if (this.switches.length === 0) {
      this.isSwitchesEmpty = true;
    } else {
      this.isSwitchesEmpty = false;
    }
    // Sort the table by model when the page is loaded
    this.switches = this.TabletoolsService.sortJSON(this.switches, 'model', true);
    console.log(this.switches)
    this.loaded = true;
    console.log(history.state.data)
  };
}

