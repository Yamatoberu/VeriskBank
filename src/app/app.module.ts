import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AccountSummaryDetailComponent } from './account-summary-detail/account-summary-detail.component';
import { WithdrawDepositComponent } from './withdraw-deposit/withdraw-deposit.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountTransactionHistoryComponent } from './account-transaction-history/account-transaction-history.component';
import {RouterModule} from "@angular/router";
import {Account} from "../assets/models/Account";
import {Transaction} from "../assets/models/Transaction";
import {FormsModule} from "@angular/forms";
import {AccountServices} from "../assets/services/AccountServices";

export function initSynchronousFactory() {
  return () => {
    console.log('Loading account details into session storage');
    let accounts: Array<Account> = [{
      accountNumber: 123456789,
      accountHolder: "George Feeney",
      accountType: "Checking",
      accountStatus: "Open",
      openDate: "9/9/2020",
      closeDate: "N/A",
      currentBalance: 123.45
    },
      {
        accountNumber: 987654321,
        accountHolder: "George Feeney",
        accountType: "Savings",
        accountStatus: "Open",
        openDate: "9/9/2020",
        closeDate: "N/A",
        currentBalance: 5000.00
      }]
    sessionStorage.setItem("accounts", JSON.stringify(accounts));

    console.log("Loading transaction history into session storage");
    let transactionHistory: Array<Transaction> = [
      {
        transactionId: 1,
        type: "Deposit",
        startingBalance: 0,
        transactionAmount: 200.00,
        endingBalance: 200.00,
        transactionDate: new Date("2020-09-10"),
        description: "Initial deposit",
        accountId: 123456789
      },
      {
        transactionId: 2,
        type: "Withdrawl",
        startingBalance: 200,
        transactionAmount: -76.55,
        endingBalance: 123.45,
        transactionDate: new Date("2020-09-11"),
        description: "Initial withdrawl",
        accountId: 123456789
      },
      {
        transactionId: 3,
        type: "Deposit",
        startingBalance: 0,
        transactionAmount: 5000.00,
        endingBalance: 5000.00,
        transactionDate: new Date("2020-09-10"),
        description: "Initial deposit",
        accountId: 987654321
      }
    ]
    sessionStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));

    return Promise.resolve();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AccountSummaryComponent,
    AccountSummaryDetailComponent,
    WithdrawDepositComponent,
    AccountDetailsComponent,
    AccountTransactionHistoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: AccountSummaryComponent},
      {path: 'depositWithdraw', component: WithdrawDepositComponent},
      {path: 'accountDetails/:accountNumber', component: AccountDetailsComponent},
      {path: 'accountDetails', component: AccountDetailsComponent}
    ]),
    FormsModule,
  ],
  providers: [
    AccountServices,
    {
      provide: APP_INITIALIZER,
      useFactory: initSynchronousFactory,
      deps: [],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
