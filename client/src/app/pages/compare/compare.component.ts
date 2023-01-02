import {Component, OnInit} from '@angular/core';
import {APIFetchService} from 'src/app/services/apifetch/apifetch.service';
import {ActivatedRoute} from "@angular/router";
import {StringtoolsService} from "../../services/stringtools/stringtools.service";


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
export class CompareComponent implements OnInit {
  brandName = "";
  switchName = "";
  brandName2 = "";
  switchName2 = "";
  brand1Data: Switch[] = [];
  brand2Data: Switch[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private APIFetchService: APIFetchService,
    private StringtoolsService: StringtoolsService
  ) {
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      // TODO: Make the 2nd brand not be a fucker
      // TODO: Make the link parameters not be a fucker
      // @ts-ignore
      this.brandName = this.StringtoolsService.CapEachWord(params.get('brandName'));
      // @ts-ignore
      this.switchName = this.StringtoolsService.CapEachWord(params.get('switchName'));
      // @ts-ignore
      this.brandName2 = this.StringtoolsService.CapEachWord(params.get('brandName2'));
      // @ts-ignore
      this.switchName2 = this.StringtoolsService.CapEachWord(params.get('switchName2'));
      this.brand1Data = await this.APIFetchService.getSwitches(this.brandName);
      for (let i = 0; i < this.brand1Data.length; i++) {
        if (this.brand1Data[i].model === this.switchName) {
          this.brand1Data = [this.brand1Data[i]];
          break;
        }
      }
      if (this.brandName2 !== "") {
        this.brand2Data = await this.APIFetchService.getSwitches(this.brandName2);
        for (let i = 0; i < this.brand2Data.length; i++) {
          if (this.brand2Data[i].model === this.switchName2) {
            this.brand2Data = [this.brand2Data[i]];
            break;
          }
        }
      }
    });
  }
}
