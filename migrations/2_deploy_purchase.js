// eslint-disable-next-line no-undef
const Purchase = artifacts.require("Purchase");

module.exports = function (deployer) {
    deployer.deploy(Purchase);
  
  };