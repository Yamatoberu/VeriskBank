import { Component, OnInit } from '@angular/core';
import {AccountServices} from "../../assets/services/AccountServices";
import {TransactionServices} from "../../assets/services/TransactionServices";
import {Account} from "../../assets/models/Account";

@Component({
  selector: 'app-withdraw-deposit',
  templateUrl: './withdraw-deposit.component.html',
  styleUrls: ['./withdraw-deposit.component.css']
})



export class WithdrawDepositComponent implements OnInit {

  transactionService: TransactionServices = new TransactionServices();

  accountNumber: number = 123456789;
  accountList: Array<Account> = this.accountService.getAllAccounts();

  accountBalance: number = 0;
  amount: number = 100;
  description: string = "Enter description here...";

  constructor(private accountService: AccountServices) { }

  ngOnInit(): void {
    this.accountBalance = this.accountService.getAccountBalance(Number(this.accountNumber));
  }

  accountChangeHandler(): void{
    this.accountBalance = this.accountService.getAccountBalance(Number(this.accountNumber));
  }

  performWithdrawl(): void{
    this.transactionService.performWithdrawl(Number(this.accountNumber), Number(this.amount), this.description);
    this.accountChangeHandler();
  }

  performDeposit(): void{
    this.transactionService.performDeposit(Number(this.accountNumber), Number(this.amount), this.description);
    this.accountChangeHandler();
  }
}
