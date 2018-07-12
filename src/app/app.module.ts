import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BlockInfosComponent } from './block-infos/block-infos.component';
import { TransactionInfosComponent } from './transaction-infos/transaction-infos.component';
import { AddressInfosComponent } from './address-infos/address-infos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '',  component:  HomeComponent},
  { path: 'block/:blockId',  component:  BlockInfosComponent},
  { path: 'transaction/:transactionId',  component: TransactionInfosComponent},
  { path: 'address/:addressId', component: AddressInfosComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    BlockInfosComponent,
    TransactionInfosComponent,
    AddressInfosComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- true for debugging purposes only
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
