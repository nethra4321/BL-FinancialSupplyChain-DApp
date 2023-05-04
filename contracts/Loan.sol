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

    // LoanRequest public loan;

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

 mapping(bytes32 => LoanRequest) public LoanRequestMapping;
 LoanRequest[] public LoanRequestList;
 bytes32[] public LoanRequestAddresses;

 event NewLoanPlaced(bytes32 loanID, address borrower, address provider, uint256 amount, uint256 interest_rate);

    function loan_request(address payable _borrower, address _provider, uint256 _interest_rate, uint256 _amount) public payable {
        LoanRequest memory loan;
        bytes32 loanID = keccak256(abi.encodePacked(_borrower,_provider,_interest_rate,_amount));
        
        loan.borrower = _borrower;
        loan.provider = _provider;
        loan.amount = _amount;
        loan.interest_rate = _interest_rate;
        LoanRequestList.push(loan);

        LoanRequestMapping[loanID] = loan;
        LoanRequestAddresses.push(loanID);

        require(address(_provider).balance >= _amount, "Provider doesn't have enough funds");
        // loan.status = LoanStatus.Approved;

        //loan.borrower.transfer(msg.value); //transfer to the borrower
        //payable(address(this)).transfer(msg.value); //transfer to the contract

        emit NewLoanPlaced(loanID, _borrower, _provider, _interest_rate, _amount);
    }
}
