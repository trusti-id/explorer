import { Component, OnInit } from '@angular/core';
import Web3 from 'Web3';
import { ActivatedRoute } from '@angular/router';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-block-infos',
  templateUrl: './block-infos.component.html',
  styleUrls: ['./block-infos.component.css']
})
export class BlockInfosComponent implements OnInit {
  web3: Web3;
  private blockId: number;
  private sub: any;
  gasLimit: number;
  gasUsed: number;
  nonce: string;
  difficulty: string;
  number: number;
  parentHash: string;
  blockNumber: number;
  timestamp: number;
  extraData: string;
  dataFromHex: string;
  size: number;
  confirmations: string;
  time: string;
  hash: string;
  miner: string;

  constructor(private shared: Web3Service,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.web3 = this.shared.web3;
    this.sub = this.route.params.subscribe( params => {
      this.blockId = +params['blockId'];
      if (this.blockId !== undefined) {
        this.getBlockInfo();
      } else {
        //
      }
    });

  }

  async getBlockInfo() {
    this.web3.eth.getBlock(this.blockId, null, null).then( block => {
      this.web3.eth.getBlockNumber().then( blockNumber => {
        if (block.hash !== undefined) {
          this.hash = block.hash;
        } else {
          this.hash = 'pending';
        }

        if (block.miner !== undefined) {
          this.miner = block.miner;
        } else {
          this.miner = 'pending';
        }

        this.gasLimit =    block.gasLimit;
        this.gasUsed =     block.gasUsed;
        this.nonce =       block.nonce;
        this.difficulty =  ('' + block.difficulty).replace(/['"]+/g, '');
        this.number =      block.number;
        this.parentHash =  block.parentHash;
        this.blockNumber = block.number;
        this.timestamp =   block.timestamp;
        this.extraData =   block.extraData;
        this.dataFromHex = this.hex2a(block.extraData);
        this.size =        block.size;

        if (this.blockNumber !== undefined) {
          this.confirmations = blockNumber - this.blockNumber + ' Confirmations';
          if (this.confirmations === 0 + ' Confirmations') {
            this.confirmations = 'Unconfirmed';
          }
      }
      if (this.blockNumber !== undefined) {
          this.web3.eth.getBlock(this.blockNumber).then( info => {
            if (info !== undefined) {
              const newDate = new Date();
              newDate.setTime(info.timestamp * 1000);
              this.time = newDate.toUTCString();
          }
        });
      }
      });
    });
  }

  hex2a(hexx: string): string {
    const hex = hexx.toString(); // force conversion
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

}
