// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Whitelist {

    address[] public allowedAddresses;

    function getAddresses() public view returns (address[] memory) {
        return allowedAddresses;
    }

    function addAddress(address _address) external {
        allowedAddresses.push(_address);
    }

    function checkAddress(address _address) external view {
        bool found = false;
        for (uint i = 0; i < allowedAddresses.length; i++) {
            if (allowedAddresses[i] == _address) {
                found = true;
                break;
            }
        }
        require(found == true, "Address not present in the whitelist.");
    }
}