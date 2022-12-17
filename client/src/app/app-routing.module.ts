import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {BrandComponent} from "./pages/brand/brand.component";
import {NotfoundComponent} from "./pages/notfound/notfound.component";
import {CompareComponent} from "./pages/compare/compare.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: ''},
  {path: 'brand', component: BrandComponent},
  {path: 'brand/:brandName', component: BrandComponent},
  {path: 'compare/:brandName/:switchName/:brandName2/:switchName2', component: CompareComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
