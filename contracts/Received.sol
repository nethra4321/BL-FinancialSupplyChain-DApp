// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Received {

    //listen to the shipped event in past events and execute product received and store event in ganache
    //bill generated with Bill ID
    struct Receipt {
        bytes32 shipID;
        bytes32 orderID;
        address buyer;
        address vendor;
        string product;
        uint8 num_days;
        uint256 qty;
        uint256 amount;
    }

    event ProductReceived(
         bytes32 billID, 
         bytes32 shipID, 
         bytes32 orderID,
         address buyer, 
         address vendor, 
         string product, 
         uint8 num_days, 
         uint256 qty,
         uint256 amount);

    mapping (bytes32 => Receipt) public receiptMapping;
    Receipt[] public ReceiptList;
    bytes32[] public ReceiptListAddresses;

    function receive_product(bytes32 _shipID, bytes32 _orderID, address _buyer, address _vendor, string calldata _product, 
    uint8 _num_days, uint256 _qty, uint256 _amount) public {

        bytes32 billID = keccak256(abi.encodePacked(_shipID, _orderID, _buyer, _vendor));
        Receipt memory rec;

        rec.shipID = _shipID;
        rec.orderID = _orderID;
        rec.buyer = _buyer;
        rec.vendor = _vendor;
        rec.product = _product;
        rec.num_days = _num_days;
        rec.qty = _qty;
        rec.amount = _amount;
        receiptMapping[billID] = rec;
        ReceiptList.push(rec);
        ReceiptListAddresses.push(billID);
        
        emit ProductReceived(billID, rec.shipID, rec.orderID, rec.buyer, rec.vendor, rec.product, rec.num_days, rec.qty, rec.amount);
    }
}