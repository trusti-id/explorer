import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Web3 from 'Web3';
import { Web3Service } from '../web3.service';
import { TransactionClass } from '../transaction-infos/TransactionClass';

@Component({
  selector: 'app-transaction-infos',
  templateUrl: './transaction-infos.component.html',
  styleUrls: ['./transaction-infos.component.css']
})
export class TransactionInfosComponent implements OnInit, OnDestroy {
  web3: Web3;
  private transactionId: string;
  private sub: any;
  tx: TransactionClass;
  constructor(private shared: Web3Service, private route: ActivatedRoute, private router: Router) {
    this.tx = new TransactionClass(null);
  }

  ngOnInit() {
    this.web3 = this.shared.web3;
    this.sub = this.route.params.subscribe( params => {
      this.transactionId = params['transactionId'];
      if (this.transactionId !== undefined) {
        this.web3.eth.getTransaction(this.transactionId)
        .then( result => {
          this.web3.eth.getBlockNumber()
          .then(number => {
            this.tx.blockHash = +result.blockHash;
            this.tx.blockHashStr = result.blockHash;
            this.tx.blockNumber = result.blockNumber;
            this.tx.blockNumberStr = String(result.blockNumber);
            this.tx.from = result.from;
            this.tx.gas = result.gas;
            this.tx.gasPrice = result.gasPrice; // result.gasPrice.c[0] + " WEI";
            this.tx.hash = result.hash;
            this.tx.input = result.input;
            this.tx.nonce = result.nonce;
            this.tx.to = result.to;
            this.tx.transactionIndex = result.transactionIndex;
            this.tx.ethValue = result.value; // result.value.c[0] / 10000;
            this.tx.txprice = (result.gas * +result.gasPrice) / 1000000000000000000;
            if (this.tx.blockNumber !== undefined) {
              this.tx.conf = number - this.tx.blockNumber;
              if (this.tx.conf === 0) {
                this.tx.confStr = 'unconfirmed'; // TODO change color button when unconfirmed... ng-if or ng-class
              }
            }
            if (this.tx.blockNumber !== undefined) {
              this.web3.eth.getBlock(this.tx.blockNumber).then( block => {
                  this.tx.time = block.timestamp;
                });
            }
          });
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  async getTransactionInfos() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
