### Description
This is the prototype of a FIFA2022 prediction market pool. In this version there is only one pool where users can bet on France, the current champion, winnig or loosing the FIFA2022. My goal is to create a fully functional prediction market platform with plenty of pools and more features, but I realised that I still got a lot to learn while finalizing this project (especially about traditional web development as I entered this course with practically 0 coding background, but frankly I enjoy smart contract programming way much more!)

### Participate
To participate, users must pick a side and deposit a non-zero amount of ETH.

### Reporting Results
In production the results would be reported in a decentralized manner via a custom Chainlink data feed. In this rough draft however, the owner of the prediction market contract is the oracle and must report results manually. Please reach out to me if you would like me to call the function!

### Winnings Distribution and Claim Funds
The winners will share the loosers deposits in proportion to their own ETH deposits. If one side does not get any bets at all, then everybody gets a refund.

### Dependencies
* OpenZeppelin's JS library `npm i @openzeppelin/contracts`
* Web3 JS library `npm i web3`
* Truffle Assert for testing `npm i truffle-assertions`

### Links and addresses
* Frontend link = `https://finessiano.github.io/blockchain-developer-bootcamp-final-project/frontend/`
* My ETHEREUM address for certification = `0x9eb61768ed41fC7215c08d3aC0ac56F976FbCECE`
