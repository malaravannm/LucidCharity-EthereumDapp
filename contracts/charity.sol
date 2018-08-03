pragma solidity ^0.4.0;

contract charity{
    
 function get_donation_details(uint donation_amount) public returns (string){   
     if (donation_amount > 0){
         if (donation_amount <= 5000){
             return 'Silver Class';
         }
         
         if (donation_amount > 5000 && donation_amount <= 10000){
             return 'Gold Class';
         }
     }
     else{
        return 'Invalid Amount';
     }
 }
 
function donation_message() public returns (string){
    return 'Welcome to the Charity Dapp';
} 
}