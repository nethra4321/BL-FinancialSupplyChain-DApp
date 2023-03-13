// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//  enum LoanStatus {Pending, Approved, Rejected}

contract Loan {
    
    struct LoanRequest {
        address payable borrower;
        address provider;
        uint256 amount;    
        // LoanStatus status;
        bool approved;
        uint256 interest_rate; //128 bytes and 10 decimal places   
    } 

    LoanRequest public loan;

    // constructor(uint256 _amount, uint256 _interest_rate) {
    //     Loan memory init = Loan(payable(msg.sender), address(0x0), _amount, LoanStatus.Pending, false, _interest_rate);
    //     // borrower = payable(msg.sender);
    //     // provider = address(0x0);
    //     // interest_rate = _interest_rate;
    //     // amount = _amount;
    //     // approved = false;
    //     loan = init;
    // }

    receive() external payable {}

    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

 event NewLoanPlaced(address borrower, address provider, uint256 amount, uint256 interest_rate);

    function approve_loan(address payable _borrower, address _provider, uint256 _interest_rate, uint256 _amount) public payable {

        loan.borrower = _borrower;
        loan.provider = _provider;
        loan.amount = _amount;
        loan.interest_rate = _interest_rate;
       
        require(address(_provider).balance >= _amount, "Provider doesn't have enough funds");
        // loan.status = LoanStatus.Approved;

        loan.borrower.transfer(msg.value);

        emit NewLoanPlaced(loan.borrower, loan.provider, loan.amount, loan.interest_rate);
    }
}
