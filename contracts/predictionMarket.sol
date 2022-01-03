// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title FIFA2022 Prediction (Blockchain Developer Bootcamp Final Project)
/// @author Andor Szegedi
/// @notice This is a prototype of a FIFA2022 Prediction Market pool
/// @dev reportResult to be called manually by contract owner in this version
/// @custom:experimental This is an experimental contract.

contract predictionMarket is Ownable {

  enum Side { FranceWin, FranceLoose }

  struct Result {
    Side winner;
    Side loser;
  }

  Result result;

  bool public marketFinished;

  mapping(Side => uint) public bets;
  mapping(address => mapping(Side => uint)) public betsPerUser;

  /// @notice Will France win FIFA2022? Pick a side and pay more than 0 ETH
  function placeBet(Side _side) external payable {
    require(marketFinished == false, 'market expired');
    require(msg.value > 0, 'must bet more than 0');
    bets[_side] += msg.value;
    betsPerUser[msg.sender][_side] += msg.value;
  }

  function claimFunds() external {
    require(marketFinished == true, 'market not expired yet');
    uint totalDepositedbyUser =
      betsPerUser[msg.sender][Side.FranceWin] +
      betsPerUser[msg.sender][Side.FranceLoose];
    require(totalDepositedbyUser > 0, 'no deposits found');
  /// @notice if one side did not receive any bets = everybody gets a refund
    if (bets[Side.FranceWin] == 0 || bets[Side.FranceLoose] == 0) {
        betsPerUser[msg.sender][Side.FranceWin] = 0;
        betsPerUser[msg.sender][Side.FranceLoose] = 0;
      (bool sent, ) =
        msg.sender.call{value: totalDepositedbyUser}("");
        require(sent, "failed to send Ether");
    } else {
      uint userBet = betsPerUser[msg.sender][result.winner];
      require(userBet > 0, 'you do not have any winning bets');
  /// @notice gains distributed proportionally to users bets
      uint gain = userBet + bets[result.loser] * userBet / bets[result.winner];
      betsPerUser[msg.sender][Side.FranceWin] = 0;
      betsPerUser[msg.sender][Side.FranceLoose] = 0;
      (bool sent, ) = msg.sender.call{value: gain}("");
      require(sent, "failed to send Ether");
      }
  }

  /// @notice to be called only by the contract owner manually in this version
  /// @dev owner to be replaced by custom Chainlink Oracle in production
  function reportResult(Side _winner, Side _loser) external onlyOwner {
    require(marketFinished == false, 'already reported');
    result.winner = _winner;
    result.loser = _loser;
    marketFinished = true;
  }
}
