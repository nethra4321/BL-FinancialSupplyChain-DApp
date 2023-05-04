// eslint-disable-next-line no-undef
const LoanApproved = artifacts.require("LoanApproved");

module.exports = function (deployer) {
    deployer.deploy(LoanApproved);
  
  };