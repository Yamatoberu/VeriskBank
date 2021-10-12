import {Transaction} from "../models/Transaction";
import {AccountServices} from "./AccountServices";

export class TransactionServices{

  accountService = new AccountServices();

  private TRANSACTION_HISTORY_KEY = "transactionHistory";

  getAllTransactions(): Array<Transaction>{
    let transactions: Array<Transaction> = new Array<Transaction>();
    if(sessionStorage.getItem(this.TRANSACTION_HISTORY_KEY) != null){
      transactions = JSON.parse(<string>sessionStorage.getItem(this.TRANSACTION_HISTORY_KEY));
    }
    return transactions;
  }

  getTransactionsForAccount(accountId: number): Array<Transaction> {
    let parsedJson: Array<Transaction> = new Array<Transaction>();
    if(sessionStorage.getItem(this.TRANSACTION_HISTORY_KEY) != null){
      parsedJson = JSON.parse(<string>sessionStorage.getItem(this.TRANSACTION_HISTORY_KEY));
    }
    let transactionsForAccount = parsedJson.filter( transaction => transaction.accountId === accountId);
    return transactionsForAccount;
  }

  performDeposit(accountId: number, transactionAmount: number, description: string): void {
    let currentBalance = this.accountService.getAccountBalance(accountId);
    let transaction: Transaction = this.createTransaction(accountId, currentBalance,  transactionAmount, description, "WITHDRAWL");
    this.addTransactionToHistory(transaction);
    this.accountService.setAccountBalance(accountId, transaction.endingBalance);
    alert("Deposit Successful");
  }

  performWithdrawl(accountId: number, transactionAmount: number, description: string): void {
    let currentBalance = this.accountService.getAccountBalance(accountId);
    if (currentBalance >= transactionAmount){
      transactionAmount = -Math.abs(transactionAmount);
      let transaction: Transaction = this.createTransaction(accountId, currentBalance,  transactionAmount, description, "WITHDRAWL");
      this.addTransactionToHistory(transaction);
      this.accountService.setAccountBalance(accountId, transaction.endingBalance);
      alert("Withdrawl Successful");
    } else {
      alert("Insufficient Funds");
    }
  }

  createTransaction(accountId: number,startingBalance: number,  transAmount: number, desc: string, type: string): Transaction {
    let transaction: Transaction = {
      transactionId: transAmount,
      type: type,
      startingBalance: startingBalance,
      transactionAmount: transAmount,
      endingBalance: startingBalance + transAmount,
      transactionDate: new Date,
      description: desc,
      accountId: accountId
    };
    return transaction;
  }

  addTransactionToHistory(transaction: Transaction): void {
    let transactionHistory: Array<Transaction> = this.getAllTransactions();
    transactionHistory.push(transaction);
    sessionStorage.setItem(this.TRANSACTION_HISTORY_KEY, JSON.stringify(transactionHistory));
  }

}
