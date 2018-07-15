import { Component, OnInit, OnDestroy } from '@angular/core';
import Web3 from 'Web3';
import { ActivatedRoute, Router } from '@angular/router';
import { Web3Service } from '../web3.service';
import { BlockClass } from './BlockClass';
import { TransactionClass } from '../transaction-infos/TransactionClass';

@Component({
  selector: 'app-block-infos',
  templateUrl: './block-infos.component.html',
  styleUrls: ['./block-infos.component.css']
})
export class BlockInfosComponent implements OnInit, OnDestroy {
  web3: Web3;
  private blockId: number;
  private sub: any;
  block: BlockClass;
  transactions: Array<TransactionClass> = [];

  constructor(private shared: Web3Service,  private route: ActivatedRoute, private router: Router) {
    this.block = new BlockClass();
  }

  ngOnInit() {
    this.web3 = this.shared.web3;
    this.sub = this.route.params.subscribe( params => {
      this.blockId = +params['blockId'];
      if (this.blockId !== undefined) {
        this.getBlockInfo()
        .then( () => { this.parseTransactions(); } );
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  async getBlockInfo() {
    this.web3.eth.getBlock(this.blockId, null, null)
    .then( block => {
      this.block.hash =        block.hash;
      this.block.miner =       block.miner;
      this.block.gasLimit =    block.gasLimit;
      this.block.gasUsed =     block.gasUsed;
      this.block.nonce =       block.nonce;
      this.block.difficulty =  ('' + block.difficulty).replace(/['"]+/g, '');
      this.block.number =      block.number;
      this.block.parentHash =  block.parentHash;
      this.block.blockNumber = block.number;
      this.block.timestamp =   block.timestamp;
      this.block.extraData =   block.extraData;
      this.block.dataFromHex = this.hex2a(block.extraData);
      this.block.size =        block.size;
      this.web3.eth.getBlockNumber()
      .then( blockNumber => {
        this.block.confirmations = (blockNumber - this.block.blockNumber) + ' Confirmations';
        this.web3.eth.getBlock(this.block.blockNumber)
        .then( info => {
          const newDate = new Date();
          newDate.setTime(info.timestamp * 1000);
          this.block.time = newDate.toUTCString();
        });
      });
    });
  }

  parseTransactions() {
    this.web3.eth.getBlockTransactionCount(this.blockId)
    .then( count => { this.pushTransactions(count); });
  }

  async pushTransactions(count: number) {
    for (let i = 0; i < count; i++) {
      const transaction = await this.web3.eth.getTransactionFromBlock(this.blockId, i, null);
      const tx = new TransactionClass(transaction);
      this.transactions.push(tx);
    }
  }

  hex2a(hex: string): string {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
