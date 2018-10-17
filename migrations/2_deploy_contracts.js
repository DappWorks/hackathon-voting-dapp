var HackathonVoting = artifacts.require("./HackathonVoting.sol");

module.exports = function(deployer) {
  deployer.deploy(HackathonVoting);
};
