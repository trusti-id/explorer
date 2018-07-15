import { Component, OnInit, OnDestroy } from '@angular/core';
import Web3 from 'Web3';
import { ActivatedRoute } from '@angular/router';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-address-infos',
  templateUrl: './address-infos.component.html',
  styleUrls: ['./address-infos.component.css']
})
export class AddressInfosComponent implements OnInit, OnDestroy {
  web3: Web3;
  private addressId: string;
  private sub: any;
  balance: number;
  balanceInEther: number;

  constructor(private shared: Web3Service, private route: ActivatedRoute) { }

  ngOnInit() {
    this.web3 = this.shared.web3;
    this.sub = this.route.params.subscribe( params => {
      this.addressId = params['addressId'];
      if (this.addressId !== undefined) {
        this.web3.eth.getBalance(this.addressId, null, null).then( result => {
          this.balance = result;
          this.balanceInEther = this.web3.utils.fromWei(result, 'ether');
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
