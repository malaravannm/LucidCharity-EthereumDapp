import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service'

const charityArtifacts = require('../../build/contracts/charity.json');
const contract = require('truffle-contract');

@Injectable()
export class LucidCharityService {

	Charity_Contract  = contract(charityArtifacts);

  constructor(
  	private web3Ser: Web3Service,
  	) { 
  	// Bootstrap the MetaCoin abstraction for Use
		this.Charity_Contract.setProvider(web3Ser.web3.currentProvider);
  }

  /* getBalance(account): Observable<number> {
    let charity_instance;

  	return Observable.create(observer => {
  		this.Charity_Contract
  		  .deployed()
  		  .then(instance => {
            charity_instance = instance;
          //we use call here so the call doesn't try and write, making it free
  		    return charity_instance.getBalance.call(account, {
  		      from: account
  		    });
  		  })
  		  .then(value => {
  		    observer.next(value)
  		    observer.complete()
  		  })
  		  .catch(e => {
  		    console.log(e);
  		    observer.error(e)
  		  });
  	})
	} */
	
	get_donation_details(from, amount): Observable<any>{

  	let charity_instance;
  	return Observable.create(observer => {
  	  this.Charity_Contract
  	    .deployed()
  	    .then(instance => {
				 charity_instance = instance;
				 console.log(amount); 
				return charity_instance.get_donation_details.call(amount, {
					from: from
				});
				}).then(value => {
  	      observer.next(value)
  		    observer.complete()
  	    })
  	    .catch(e => {
  	    	console.log(e);
  	      observer.error(e)
  	    });
  	})
  }
}
