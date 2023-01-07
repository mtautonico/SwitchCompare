import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './pages/home/home.component';
import {FooterComponent} from './components/footer/footer.component';
import {BrandComponent} from './pages/brand/brand.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';
import {LoaderComponent} from './components/loader/loader.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CompareComponent} from './pages/compare/compare.component';
import {FormsModule} from "@angular/forms";
import {ConsoleToggleService} from "./services/ConsoleToogleService/console-toogle-service.service";
import {NgScrollbarModule} from "ngx-scrollbar";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    BrandComponent,
    NotfoundComponent,
    LoaderComponent,
    CompareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    NgScrollbarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private consoleToggleService: ConsoleToggleService) {
    this.consoleToggleService.disableConsoleInProduction();
  }
}

