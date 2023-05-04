// eslint-disable-next-line no-undef
const Whitelist = artifacts.require("Whitelist");

module.exports = function (deployer) {
    deployer.deploy(Whitelist);
  
  };