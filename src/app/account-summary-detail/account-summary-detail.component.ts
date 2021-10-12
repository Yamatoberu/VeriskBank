import { Component, OnInit } from '@angular/core';
import {AccountServices} from "../../assets/services/AccountServices";
import {Account} from "../../assets/models/Account";

@Component({
  selector: 'app-account-summary-detail',
  templateUrl: './account-summary-detail.component.html',
  styleUrls: ['./account-summary-detail.component.css']
})
export class AccountSummaryDetailComponent implements OnInit {

  accountList: Array<Account> = this.accountService.getAllAccounts();

  constructor(private accountService: AccountServices) { }

  ngOnInit(): void {
  }

}
