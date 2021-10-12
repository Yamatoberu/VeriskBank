import { Component, OnInit } from '@angular/core';
import {TransactionServices} from "../../assets/services/TransactionServices";
import {Transaction} from "../../assets/models/Transaction";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-account-transaction-history',
  templateUrl: './account-transaction-history.component.html',
  styleUrls: ['./account-transaction-history.component.css']
})
export class AccountTransactionHistoryComponent implements OnInit {

  transactionService: TransactionServices = new TransactionServices();

  accountNumber : number = 123456789;

  transactionHistory: Array<Transaction> = this.transactionService.getTransactionsForAccount(this.accountNumber);

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get("accountNumber") != null) {
        this.accountNumber = Number(params.get("accountNumber"));
      } else {
        this.accountNumber = 123456789;
      }
      this.transactionHistory = this.transactionService.getTransactionsForAccount(this.accountNumber);
    });
  }
}
