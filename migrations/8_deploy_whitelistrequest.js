// eslint-disable-next-line no-undef
const WhitelistRequest = artifacts.require("WhitelistRequest");

module.exports = function (deployer) {
    deployer.deploy(WhitelistRequest);
  
  };