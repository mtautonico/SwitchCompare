import {Component, OnInit} from '@angular/core';
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
export class BrandComponent implements OnInit {
  brand: string | null = "";
  switches: Switch[] = [];
  // These are pretty self-explanatory
  loaded = false;
  isSwitchesEmpty = true;
  currentSortDirectionIsAsc = true;
  currentSortField = 'model';
  lastSortField = 'model';
  filtered_switches: Switch[] = [];
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
  range_filters: any = ['actuation_distance', 'bottom_distance', 'bottom_force', 'operating_force'];

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
  parseFloat(value: number) {
    return parseFloat(String(value));
  }


  // Sets the filters back to default (all False and null basically)
  resetFilters() {
    // Nulls all range filters
    for (let i = 0; i < this.range_filters.length; i++) {
      this.filters[this.range_filters[i]].min = null;
      this.filters[this.range_filters[i]].max = null;
    }
    // Set the type filters to false
    for (let i = 0; i < Object.keys(this.filters.type).length; i++) {
      this.filters.type[Object.keys(this.filters.type)[i]] = false;
    }
    // Reset the filtered switches
    this.filtered_switches = [];
  }

  filter_switches() {
    // Reset the filtered switches
    this.filtered_switches = [];
    // Checklist that each switch has to pass to be added to the filtered switches
    let filteredChecklist = {
      type: false,
      actuation_distance: false,
      bottom_distance: false,
      operating_force: false,
      bottom_force: false
    }
    const filteredTypes = [];
    // Add all the selected switch types to a list of types to filter by
    for (let i = 0; i < Object.keys(this.filters.type).length; i++) {
      if (this.filters.type[Object.keys(this.filters.type)[i]]) {
        filteredTypes.push(Object.keys(this.filters.type)[i]);
      }
    }
    for (let i = 0; i < this.switches.length; i++) {
      // Reset the checklist
      filteredChecklist = {
        type: false,
        actuation_distance: false,
        bottom_distance: false,
        operating_force: false,
        bottom_force: false
      }
      // If the switch type is in the filtered types, set the type filter to true
      if (filteredTypes.includes(this.switches[i].type)) {
        filteredChecklist.type = true;
      }
      // Loop through each range filter to determine if the switch is within the range or if a range is given
      for (let j = 0; j < this.range_filters.length; j++) {
        const current_range: string = this.range_filters[j].toString();
        if (this.filters[current_range].min !== null && this.filters[current_range].max !== null) {
          // @ts-ignore
          if (this.switches[i][current_range] >= this.filters[current_range].min &&
            // @ts-ignore
            this.switches[i][current_range] <= this.filters[current_range].max) {
            // @ts-ignore
            filteredChecklist[current_range] = true;
          }
        } else if (this.filters[current_range].min == null && this.filters[current_range].max == null) {
          // @ts-ignore
          filteredChecklist[current_range] = true;
        }
      }
      // If the switch passes all the filters, add it to the filtered switches
      if (filteredChecklist.type && filteredChecklist.actuation_distance && filteredChecklist.bottom_distance &&
        filteredChecklist.operating_force && filteredChecklist.bottom_force) {
        this.filtered_switches.push(this.switches[i]);
      }
    }
  }


  // We need the brand in case theres a situation where 2 brands have the same model name
  // TODO: Write this function
  compareSwitch(selectedBrand: string, selectedSwitch: string) {
    this.router.navigate(['/compare', selectedBrand, selectedSwitch]);
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
  }
}

