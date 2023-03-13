// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Shipping {

    //contract to emit a event stating that goods have been shipped
    //pass the return values of event into this contract - > call the product shipped event with same parameters and store in ganache
    //create a shipping ID

    struct Ship {
        bytes32 orderID;
        address buyer;
        address vendor;
        string product;
        uint256 qty;
        uint256 amount;
    }

    mapping (bytes32 => Ship) public ship_orders;

    event ProductShipped(bytes32 shipID, uint8 num_days, bytes32 orderID, address buyer, address vendor, string product, uint256 qty, uint256 amount);

    function generateRandomNumber() public view returns (uint8) 
    {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)));
        return uint8((randomNumber % 10) + 1);
    }

    function ship(bytes32 _orderID, address _buyer, address _vendor, string calldata _product, uint256 _qty, uint256 _amount) public { 

        bytes32 ship_order_ID = keccak256(abi.encodePacked(_orderID,_buyer,_vendor));

        Ship memory ship_order;
        ship_order.orderID = _orderID;
        ship_order.buyer = _buyer;
        ship_order.vendor = _vendor;
        ship_order.product = _product;
        ship_order.qty = _qty;
        ship_order.amount = _amount;
        ship_orders[ship_order_ID] = ship_order;
        
        emit ProductShipped(ship_order_ID, generateRandomNumber(), ship_order.orderID, ship_order.buyer, ship_order.vendor, ship_order.product, ship_order.qty, ship_order.amount);
    }
}