import { Component, OnInit } from '@angular/core';
import Web3 from 'Web3';
import { Web3Service } from './web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  web3: Web3;

  constructor(private shared: Web3Service) { }

  ngOnInit() {
    this.web3 = this.shared.web3;
  }
}
