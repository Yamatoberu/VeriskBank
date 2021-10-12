import { Component, OnInit } from '@angular/core';
import {Account} from "../../assets/models/Account";
import {AccountServices} from "../../assets/services/AccountServices";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  accountServices: AccountServices = new AccountServices();

  accountNumber: number = 123456789;
  account: Account = this.accountServices.getAccount(this.accountNumber);

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.get("accountNumber") != null){
        this.accountNumber = Number(params.get("accountNumber"));
      } else {
        this.accountNumber = 123456789;
      }

    });
    this.account = this.accountServices.getAccount(this.accountNumber);
  }

}
