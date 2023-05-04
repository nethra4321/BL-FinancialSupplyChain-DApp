// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract LoanApproved {

    struct LoanReceipt {
        bytes32 loanID;
        address borrower;
        address provider;
        uint256 interest_rate;
        uint256 amount;
    }

    receive() external payable {}

    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    event LoanApprovedEvent(bytes32 receiptID, bytes32 loanID, address borrower, address provider, uint256 interest_rate, uint256 amount);

    mapping(bytes32 => LoanReceipt) public LoanReceiptMapping;
    bytes32[] public LoanReceiptAddresses; 
    LoanReceipt[] public LoanReceipts;

    function loan_approve(bytes32 _loanID, address _borrower, address _provider, uint256 _interest_rate, uint256 _amount) public payable {
        bytes32 receiptID = keccak256(abi.encodePacked(_loanID, _borrower, _provider, _interest_rate, _amount));
        LoanReceipt memory loan_receipt;
        loan_receipt.loanID = _loanID;
        loan_receipt.borrower = _borrower;
        loan_receipt.provider = _provider;
        loan_receipt.interest_rate = _interest_rate;
        loan_receipt.amount = _amount;
        LoanReceiptMapping[receiptID] = loan_receipt;
        
        LoanReceipts.push(loan_receipt);
        LoanReceiptAddresses.push(receiptID);

        payable(_borrower).transfer(msg.value);

        emit LoanApprovedEvent(receiptID, _loanID, _borrower, _provider, _interest_rate, _amount);   
    }
}