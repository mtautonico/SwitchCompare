import {Component, OnInit} from '@angular/core';
import {LoaderComponent} from "../../components/loader/loader.component";
import {APIFetchService} from 'src/app/services/apifetch/apifetch.service';
import {ActivatedRoute, Router} from "@angular/router";
import {StringtoolsService} from "../../services/stringtools/stringtools.service";


interface Switch {
  brand: string;
  model: string;
  type: string;
  image: string;
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
  loaded = false


  constructor(
    private readonly route: ActivatedRoute,
    private APIFetchService: APIFetchService,
    private StringtoolsService: StringtoolsService,
    private readonly router: Router,
  ) {
  }

  // Angular doesn't like parseFloat idk why so I have to do this
  parseFloat(value: number) {
    return parseFloat(String(value));
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      // @ts-ignore
      this.brandName = this.StringtoolsService.CapEachWord(params.get('brandName'));
      // @ts-ignore
      this.switchName = this.StringtoolsService.CapEachWord(params.get('switchName'));
      // @ts-ignore
      this.brandName2 = this.StringtoolsService.CapEachWord(params.get('brandName2'));
      // @ts-ignore
      this.switchName2 = this.StringtoolsService.CapEachWord(params.get('switchName2'));
      if (this.switchName2 === "") {
        await this.router.navigate(['/compare', this.brandName, this.switchName]);
      }
    });
    this.brand1Data = await this.APIFetchService.getSwitch(this.brandName, this.switchName);
    this.brand1Data = [this.brand1Data[0]];
    if (this.brandName2 !== "") {
      this.brand2Data = await this.APIFetchService.getSwitch(this.brandName2, this.switchName2);
      this.brand2Data = [this.brand2Data[0]];
    }
    console.log(this.brand1Data);
    console.log(this.brand2Data);
    this.loaded = true
  }
}

