import { Injectable } from '@angular/core';
import Web3 from 'Web3';
import { HttpProvider } from 'Web3/types';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  eth_node_url = 'http://localhost:8545';
  // eth_node_url = 'https://mainnet.infura.io/iwhui2ZhRmsAKLiqWosY';
  provider: HttpProvider;
  web3: Web3;
  connected: boolean;
  constructor() {
    this.web3 = new Web3();
    this.provider = new this.web3.providers.HttpProvider(this.eth_node_url);
    this.web3.setProvider(this.provider);
    this.checkConnection();
  }

  checkConnection() {
    this.web3.eth.net.isListening()
    .then((s) => {
      console.log('We\'re still connected to the node');
    })
    .catch((e) => {
      console.log('Lost connection to the node, reconnecting');
      this.web3.setProvider(this.provider);
    });
  }
}
