export class BlockClass {
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
    confirmations = 'Unconfirmed';
    time: string;
    hash = 'pending';
    miner = 'pending';
}
