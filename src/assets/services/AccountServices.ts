import {Account} from "../models/Account";
import {Injectable} from "@angular/core";

@Injectable()
export class AccountServices{

  private ACCOUNTS_KEY: string = "accounts";

  private accountBalance: number;

  constructor() {
    this.accountBalance = 500;
  }

  getAllAccounts(): Array<Account> {
    let accounts: Array<Account> = new Array<Account>();
    if (sessionStorage.getItem(this.ACCOUNTS_KEY) != null) {
      accounts = JSON.parse(<string>sessionStorage.getItem(this.ACCOUNTS_KEY));
    }
    return accounts;
  }

  getAccount(accountId: number): Account {
    let accounts: Array<Account> = this.getAllAccounts();
    let account: Account = <Account> accounts.filter(account => account.accountNumber === accountId).pop();
    return account;
  }

  getAccountBalance(accountId: number): number {
    let account: Account = this.getAccount(accountId);
    return account.currentBalance;
  }

  setAccountBalance(accountId: number, newBalance: number): void {
    this.accountBalance = newBalance;
    let accounts: Array<Account> = this.getAllAccounts();
    let accountIndex: number = accounts.findIndex(account => account.accountNumber === accountId);
    accounts[accountIndex].currentBalance = newBalance;
    sessionStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));
  }
}
