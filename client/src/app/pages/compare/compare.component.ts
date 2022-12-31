import {Component} from '@angular/core';
import {APIFetchService} from 'src/app/services/apifetch/apifetch.service';
import {ActivatedRoute} from "@angular/router";


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
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.less']
})
export class CompareComponent {
  brandName: string = "";
  switchName: string = "";
  brandName2: string = "";
  switchName2: string = "";
  brand1Data: Switch[] = [];
  brand2Data: Switch[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private APIFetchService: APIFetchService,
  ) {
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      // TODO: Make the 2nd brand not be a fucker
      // TODO: Make the link parameters not be a fucker
      this.brandName = params.get('brandName') || "";
      this.switchName = params.get('switchName') || "";
      this.brandName2 = params.get('brandName2') || "";
      this.switchName2 = params.get('switchName2') || "";
      this.brand1Data = await this.APIFetchService.getSwitches(this.brandName);
      for (let i = 0; i < this.brand1Data.length; i++) {
        if (this.brand1Data[i].model === this.switchName) {
          this.brand1Data = [this.brand1Data[i]];
          break;
        }
      }
      this.brand2Data = await this.APIFetchService.getSwitches(this.brandName2);
      for (let i = 0; i < this.brand2Data.length; i++) {
        if (this.brand2Data[i].model === this.switchName2) {
          this.brand2Data = [this.brand2Data[i]];
          break;
        }
      }
      console.log(this.brand1Data);
      console.log(this.brand2Data);
    });
  }
}
