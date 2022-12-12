import {Component} from '@angular/core';
import {APIFetchService} from "../../services/apifetch/apifetch.service";
import {TabletoolsService} from "../../services/tabletools/tabletools.service";
import {Router} from "@angular/router";

interface Brand {
  name: string;
  logo: string;
}

interface SelectedBrands {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {

  constructor(private APIFetchService: APIFetchService,
              private TabletoolsService: TabletoolsService,
              private router: Router) {
  }

  isSelectedToggled: boolean = false;
  selectedBrands: SelectedBrands[] = [];
  finalSelectedBrands: string[] = [];
  brands: Brand[] = [];

  toggleSelect() {
    this.isSelectedToggled = !this.isSelectedToggled;
    // Loops through to reset all selected values to false
    for (let i = 0; i < this.selectedBrands.length; i++) {
      this.selectedBrands[i].selected = false;
    }
    console.log(this.isSelectedToggled);
  }
  // Idk why this has to be here, angular doesnt like the function to be inline
  checkSelect(item: string) {
    return this.selectedBrands[this.selectedBrands.findIndex(x => x.name === item)].selected;
  }
  // Handles the click to determine if the user wants to select/deselect a brand or go to the brand page
  handleClick(item: string) {
    if (this.isSelectedToggled) {
      this.selectedBrands[this.selectedBrands.findIndex(x => x.name === item)].selected =
        !this.selectedBrands[this.selectedBrands.findIndex(x => x.name === item)].selected;

      console.log(this.selectedBrands)
    } else if (this.isSelectedToggled && this.selectedBrands[this.selectedBrands.findIndex(x => x.name === item)].selected) {
      this.selectedBrands[this.selectedBrands.findIndex(x => x.name === item)].selected = false;
    } else {
      this.router.navigate(['/brand', item])
    }
  }
  // Creates a final list of your selected brands to send it to the brand page
  parseSelectedBrands() {
    for (let i = 0; i < this.selectedBrands.length; i++) {
      if (this.selectedBrands[i].selected) {
        this.finalSelectedBrands.push(this.selectedBrands[i].name);
      }
    }
    this.router.navigate(['/brand'], {state: {data: this.finalSelectedBrands}});
  }
  async ngOnInit() {
    // Sorts the brands alphabetically
    this.brands = this.TabletoolsService.sortJSON(await this.APIFetchService.getBrands(), 'name', true);
    // Adds all the brands to the selectedBrands array for use with multiple brand selection
    for (let i = 0; i < this.brands.length; i++) {
      this.selectedBrands.push({name: this.brands[i].name, selected: false});
    }
    console.log(this.brands);
  }
}
