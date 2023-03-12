// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// enum OrderStatus {Not_Started, Order_Placed, Vendor_Action, Vendor_Delivered, Order_Completed}

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
    mapping(bytes32 => Order) public orders;

    event NewOrderPlaced(bytes32 orderId, address buyer, address vendor, string product, uint256 quantity, uint256 amount);

    receive() external payable {}

    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function placePurchaseOrder(address _buyer, address _vendor, string calldata _product, uint256 _quantity, uint256 _amount) public payable {

        bytes32 orderID = keccak256(abi.encodePacked(_buyer,_vendor,_product,_quantity,_amount));
        Order storage purchase_order = orders[orderID];

        // require(purchase_order.status == OrderStatus.Not_Started, "Order has already been started");

        purchase_order.buyer = _buyer;
        purchase_order.vendor = _vendor;
        purchase_order.product = _product;
        purchase_order.qty = _quantity;
        purchase_order.amount = _amount;
        // purchase_order.status = OrderStatus.Order_Placed;

        emit NewOrderPlaced(orderID, _buyer, _vendor, _product, _quantity, _amount);

        // payable(_vendor).transfer(_amount);
        payable(_vendor).transfer(msg.value);

    }

}