const predictionMarket = artifacts.require("predictionMarket");

module.exports = function (deployer) {
  deployer.deploy(predictionMarket);
};
