import { Component, OnInit } from '@angular/core';
import { Block } from 'Web3/types';
import Web3 from 'Web3';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blocks: Array<Block>;
  web3: Web3;
  maxBlocks = 50;
  blockNum: number;
  constructor(private shared: Web3Service) { }

  ngOnInit() {
    this.web3 = this.shared.web3;
    this.web3.eth.getBlockNumber().then( number => {
      if (this.maxBlocks > number) {
        this.maxBlocks = number + 1;
      }
      this.processArray(number);
    });
  }

  async processArray(num: number) {
    for (let i = 0; i < this.maxBlocks; i++) {
      const block = await this.web3.eth.getBlock(num - i);
      this.blocks.push(block);
      console.log('block pushed ' + block.number);
    }
  }

}
