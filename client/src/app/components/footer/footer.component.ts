import { Component } from '@angular/core';
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent {

  faGithub = faGithub;
  faCoffee = faCoffee;
  Year() {
    return new Date().getFullYear();
  }
}
