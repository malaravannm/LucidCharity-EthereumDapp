import { Component, HostListener, NgZone } from '@angular/core';

import {Web3Service, LucidCharityService} from '../services/services'

import { canBeNumber } from '../util/validation';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  // TODO add proper types these variables
  account: any;
  accounts: any;

  balance: number;
  donationAmount: number;
  recipientAddress: string;
  status: string;
  membership_class: string;
  canBeNumber = canBeNumber;

  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private lucidCharityService: LucidCharityService,
    ) {
    this.onReady();
  }

  onReady = () => {

    // Get the initial account balance so it can be displayed.
    this.web3Service.getAccounts().subscribe(accs => {
      this.accounts = accs;
      this.account = this.accounts[0];

      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      /* this._ngZone.run(() =>
       this.refreshBalance() 
      );*/
    }, err => alert(err))
  };

  /* refreshBalance = () => {
    this.lucidCharityService.getBalance(this.account)
      .subscribe(value => {
        this.balance = value
      }, e => {this.setStatus('Error getting balance; see log.')})
  }; */

  setStatus = message => {
    this.status = message;
  };

  get_donation_details = () => {
    this.setStatus('Initiating transaction... (please wait)');

    this.lucidCharityService.get_donation_details(this.account,this.donationAmount)
      .subscribe(value =>{
        this.membership_class = value;
        this.setStatus('Transaction complete!' || value);
    }, e => this.setStatus('Error getting donor class; see log.'))
  };
}
