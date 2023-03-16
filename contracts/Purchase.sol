// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Whitelist.sol";

// enum OrderStatus {Not_Started, Order_Placed, Vendor_Action, Vendor_Delivered, Order_Completed}
// interface IWhiteList {
//     function addAddress(address _address) external;
//     function checkAddress(address _address) external view;
// }

contract Purchase {
    struct Order {
        address buyer;
        address vendor;
        string product;
        uint256 qty;
        uint256 amount;
        // OrderStatus status;
    } //order in the blockchain
    string name;
    address public whitelistAddress=0x32942f2B8ef09a73c45146Bc16680F775b26D317;

    Whitelist whitelist = Whitelist(whitelistAddress);

    mapping(bytes32 => Order) public orderMapping;
    Order[] public orderList;
    bytes32[] public orderListAddresses;

    event NewOrderPlaced(bytes32 orderId, address buyer, address vendor, string product, uint256 quantity, uint256 amount);

    receive() external payable {}

    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function placePurchaseOrder(address _buyer, address _vendor, string calldata _product, uint256 _quantity, uint256 _amount) public payable {
    
        //whitelist.checkAddress(_buyer); //implements the whitelist

        bytes32 orderID = keccak256(abi.encodePacked(_buyer,_vendor,_product,_quantity,_amount));
        Order memory purchase_order;
        // require(purchase_order.status == OrderStatus.Not_Started, "Order has already been started");
        purchase_order.buyer = _buyer;
        purchase_order.vendor = _vendor;
        purchase_order.product = _product;
        purchase_order.qty = _quantity;
        purchase_order.amount = _amount;
        // purchase_order.status = OrderStatus.Order_Placed;

        orderMapping[orderID] = purchase_order;
        orderList.push(purchase_order);
        orderListAddresses.push(orderID);

        emit NewOrderPlaced(orderID, _buyer, _vendor, _product, _quantity, _amount);

        // payable(_vendor).transfer(_amount);
        payable(_vendor).transfer(msg.value);

    }

}