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
  // These are pretty self-explanatory
  loaded: boolean = false;
  isSwitchesEmpty: boolean = true;
  currentSortDirectionIsAsc: boolean = true;
  currentSortField: string = 'model';
  lastSortField: string = 'model';
  // These are for the table header sorting
  headerSort: any = {
    brand: null,
    model: null,
    type: null,
    actuation_distance: null,
    bottom_distance: null,
    operating_force: null,
    bottom_force: null
  }
  // These are for the filters on the left to process in the filter function
  filters: any = {
    type: {
      clicky: false,
      linear: false,
      tactile: false,
    },
    actuation_distance: {
      min: null,
      max: null
    },
    bottom_distance: {
      min: null,
      max: null
    },
    operating_force: {
      min: null,
      max: null
    },
    bottom_force: {
      min: null,
      max: null
    }
  }
  // idk I felt like being slightly efficient in my code for once
  range_filters: any = ['actuation_distance', 'bottom_distance', 'operating_force', 'bottom_force'];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private APIFetchService: APIFetchService,
    private TabletoolsService: TabletoolsService
  ) {
  }

  //  Sort the table by a given table field
  public sortTable(data: any, key: string) {
    // If the interacted field is not the same as the last one, reset the last one and sort the new one
    if (this.currentSortField !== key) {
      this.currentSortField = key;
      this.switches = this.TabletoolsService.sortJSON(data, key, true);
      this.currentSortDirectionIsAsc = true;
      this.headerSort[this.lastSortField] = null;
      this.headerSort[key] = "asc";
      this.lastSortField = key;
    //  If the interacted field is the same as the last one, reverse the sort direction
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


  // Sets the filters back to default (all False and null basically)
  resetFilters() {
    for (let i = 0; i < this.range_filters.length; i++) {
      this.filters[this.range_filters[i]].min = null;
      this.filters[this.range_filters[i]].max = null;
    }
    for (let i = 0; i < Object.keys(this.filters.type).length; i++) {
      this.filters.type[Object.keys(this.filters.type)[i]] = false;
    }
  }

  // TODO: Make a function to filter through the data and set said filtered data to a separate variable
  filter_switches() {

  }

  // We need the brand in case theres a situation where 2 brands have the same model name
  // TODO: Write this function
  compareSwitch(selectedBrand: string, selectedSwitch: string) {

  }

  // These run when the page is loaded
  async ngOnInit() {
    // Gets params from the URL
    this.route.paramMap.subscribe(params => {
      this.brand = params.get("brandName")
    });
    // Gets list of selected switches from the previous page if present
    if (history.state.data != undefined) {
      for (let i = 0; i < history.state.data.length; i++) {
        this.switches.push(await this.APIFetchService.getSwitches(history.state.data[i]));
      }
      this.switches = this.switches.flat();
      console.log(this.switches)
      console.log("triggered a")
    //  If there are no selected switches, get all switches from the brand
    } else if (this.brand == undefined) {
      this.switches = await this.APIFetchService.getSwitches();
      console.log("triggered b")
    //  If there is a single brand selected, get all switches from that brand
    } else {
      this.switches = await this.APIFetchService.getSwitches(this.brand);
      console.log("triggered c")
    }
    // Sets the switches to empty if there are no switches
    this.isSwitchesEmpty = this.switches.length === 0;
    // Sort the table by model when the page is loaded
    this.switches = this.TabletoolsService.sortJSON(this.switches, 'model', true);
    console.log(this.switches)
    this.loaded = true;
    console.log(history.state.data)
  };
}

