const predictionMarket = artifacts.require("predictionMarket");
///@dev we are using truffleAssert to create tests where we expect the transaction to fail
const truffleAssert = require("truffle-assertions");

contract("predictionMarket", function (accounts) {

  const SIDE = {
    FRANCE_WIN: 0,
    FRANCE_LOOSE: 1
  };

  beforeEach(async () => {
  pMInstance = await predictionMarket.new();
});

  it("should track bets per user correctly", async () => {
    await pMInstance.placeBet(SIDE.FRANCE_WIN, {from: accounts[1], value: "1000000000000000000"});
    const betsByUser = await pMInstance.betsPerUser(accounts[1], SIDE.FRANCE_WIN);
    assert.equal(betsByUser, 1000000000000000000, `did not track bet per user correctly!`);
  });

  it("should track bets per side correctly", async () => {
    await pMInstance.placeBet(SIDE.FRANCE_WIN, {from: accounts[1], value: "1000000000000000000"});
    await pMInstance.placeBet(SIDE.FRANCE_LOOSE, {from: accounts[2], value: "1000000000000000000"});
    await pMInstance.placeBet(SIDE.FRANCE_LOOSE, {from: accounts[3], value: "1000000000000000000"});
    const betsAgainst = await pMInstance.bets(SIDE.FRANCE_LOOSE);
    assert.equal(betsAgainst, 2000000000000000000, `did not track bet per side correctly!`);
  });
///@dev an example of truffleAssert, where the test passes if the last transaction fails
  it("should not allow random users to report results", async () => {
    await pMInstance.placeBet(SIDE.FRANCE_WIN, {from: accounts[1], value: "1000000000000000000"});
    await pMInstance.placeBet(SIDE.FRANCE_LOOSE, {from: accounts[2], value: "1000000000000000000"});
    await truffleAssert.fails(pMInstance.reportResult(
      SIDE.FRANCE_WIN,
      SIDE.FRANCE_LOOSE,
      {from: accounts[4]}),
      truffleAssert.ErrorType.REVERT
    );
  });
///@dev another example of truffleAssert, where the test passes if the last transaction fails
  it("should allow the owner to report results", async () => {
    await pMInstance.placeBet(SIDE.FRANCE_WIN, {from: accounts[1], value: "1000000000000000000"});
    await pMInstance.placeBet(SIDE.FRANCE_LOOSE, {from: accounts[2], value: "1000000000000000000"});
    await truffleAssert.passes(pMInstance.reportResult(
      SIDE.FRANCE_WIN,
      SIDE.FRANCE_LOOSE,
      {from: accounts[0]}),
      truffleAssert.ErrorType.REVERT
    );
  });
///@dev another example of truffleAssert, where the test passes if the last transaction fails
  it("should not accept more bets after results are reported", async () => {
    await pMInstance.placeBet(SIDE.FRANCE_WIN, {from: accounts[1], value: "1000000000000000000"});
    await pMInstance.placeBet(SIDE.FRANCE_LOOSE, {from: accounts[2], value: "1000000000000000000"});
    await pMInstance.placeBet(SIDE.FRANCE_LOOSE, {from: accounts[3], value: "1000000000000000000"});
    await pMInstance.reportResult(SIDE.FRANCE_WIN, SIDE.FRANCE_LOOSE,{from: accounts[0]});
    await truffleAssert.fails(pMInstance.placeBet(
      SIDE.FRANCE_WIN,
      {from: accounts[4],
      value: "1000000000000000000"}),
      truffleAssert.ErrorType.REVERT
    );
  });



});
