import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {APIFetchService} from "../../services/apifetch/apifetch.service";


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  brand: string | null | undefined;
  switches: object | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private APIFetchService: APIFetchService
  ) {
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.brand = params.get("brandName")
    });
    // @ts-ignore
    this.switches = await this.APIFetchService.getSwitches(this.brand);
    console.log(this.switches)
  };

}

