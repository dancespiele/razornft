const RazorContract = artifacts.require("Razor");

module.exports = function (deployer) {
  deployer.deploy(RazorContract);
};
