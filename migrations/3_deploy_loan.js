// eslint-disable-next-line no-undef
const Loan = artifacts.require("Loan");

module.exports = function (deployer) {
    deployer.deploy(Loan);
  
  };