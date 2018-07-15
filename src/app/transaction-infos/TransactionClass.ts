import { Transaction } from '../../../node_modules/Web3/types';

export class TransactionClass {
    blockHash: number;
    blockHashStr = 'pending';
    blockNumber: number;
    blockNumberStr = 'pending';
    from: string;
    gas: number;
    gasPrice: string;
    hash: string;
    id: string;
    input: string;
    nonce: number;
    to: string;
    transactionIndex: number;
    ethValue: string;
    txprice: number;
    conf: number;
    confStr: string;
    value: string;
    time: number;

    constructor(transaction: Transaction) {
        this.id = transaction.hash;
        this.hash = transaction.hash;
        this.from = transaction.from;
        this.to = transaction.to;
        this.gas = transaction.gas;
        this.input = transaction.input;
        this.value = transaction.value;
    }
}
