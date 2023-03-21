// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


//from home, on button click, should add to whitelistrequest list - if already added to whitelist, say part of whitelist, 
//if already requested to add, then alert, already requested
//from admin, get requested addresses and render in the dashboard
//when approving address, call whitelist contract -> add addresses method to add to the whitelist


contract WhitelistRequest {

    address[] public WhitelistRequestList;

    function getRequestedAddresses() public view returns (address[] memory) {
        return WhitelistRequestList;
    }

    function addRequestedAddress(address _address) external {
        WhitelistRequestList.push(_address);
    }

    function checkRequestedAddress(address _address) external view {
        bool found = false;
        for (uint i = 0; i < WhitelistRequestList.length; i++) {
            if (WhitelistRequestList[i] == _address) {
                found = true;
                break;
            }
        }
        require(found == true, "Address not present in the whitelist request.");
    }
}