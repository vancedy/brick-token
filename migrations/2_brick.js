const Migrations = artifacts.require("brickToken");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
