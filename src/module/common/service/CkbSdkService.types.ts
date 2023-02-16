import { DAOUnlockableAmount, FeeRate, Transaction } from "ckb-peersyst-sdk";

export type Chain = "mainnet" | "testnet";

export interface DepositInDAOParams {
    amount: bigint | number;
    mnemonic: string[];
    feeRate?: FeeRate;
}

export interface SendTransactionParams {
    amount: bigint | number | string;
    mnemonic: string[];
    message: string;
    to: string;
    feeRate?: FeeRate;
}

export interface WithdrawOrUnlockParams {
    unlockableAmount: DAOUnlockableAmount;
    mnemonic: string[];
}

export interface FullTransaction extends Transaction {
    token?: string;
}
