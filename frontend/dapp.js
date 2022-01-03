

// contract address on Kovan:
const predictionMarketAddress = '0x200f05AC809F20EE73562B1282889AE074118B16'

// add contract ABI:
const predictionMarketAddressABI =
[
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "enum predictionMarket.Side",
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "bets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "enum predictionMarket.Side",
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "betsPerUser",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "marketFinished",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum predictionMarket.Side",
          "name": "_side",
          "type": "uint8"
        }
      ],
      "name": "placeBet",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claimFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum predictionMarket.Side",
          "name": "_winner",
          "type": "uint8"
        },
        {
          "internalType": "enum predictionMarket.Side",
          "name": "_loser",
          "type": "uint8"
        }
      ],
      "name": "reportResult",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

// Using the 'load' event listener for Javascript to
// check if window.ethereum is available

window.addEventListener('load', function() {
  if (typeof window.ethereum !== 'undefined') {
    console.log('window.ethereum is enabled')
    if (window.ethereum.isMetaMask === true) {
      console.log('MetaMask is active')
      let mmDetected = document.getElementById('mm-detected')
      mmDetected.innerHTML += 'MetaMask Is Available!'
      // add in web3 here
      var web3 = new Web3(window.ethereum)
    } else {
      console.log('MetaMask is not available')
      let mmDetected = document.getElementById('mm-detected')
      mmDetected.innerHTML += 'MetaMask Not Available!'
      // let node = document.createTextNode('<p>MetaMask Not Available!<p>')
      // mmDetected.appendChild(node)
    }
  } else {
    console.log('window.ethereum is not found')
    let mmDetected = document.getElementById('mm-detected')
    mmDetected.innerHTML += '<p>MetaMask Not Available!<p>'
  }
})

var web3 = new Web3(window.ethereum)
// Grabbing the button object,
const mmEnable = document.getElementById('mm-connect');
// since MetaMask has been detected, we know
// `ethereum` is an object, so we'll do the canonical
// MM request to connect the account.
//
// typically we only request access to MetaMask when we
// need the user to do something, but this is just for
// an example
mmEnable.onclick = async () => {
  await ethereum.request({ method: 'eth_requestAccounts'})
  // grab mm-current-account
  // and populate it with the current address
  var mmCurrentAccount = document.getElementById('mm-current-account');
  mmCurrentAccount.innerHTML = 'Current Account: ' + ethereum.selectedAddress
}


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


// Place Bet in favour:
const winSubmit = document.getElementById('input-button-win');
winSubmit.onclick = async () => {
  const winInputValue = document.getElementById('input-box-win').value;
  var web3 = new Web3(window.ethereum);
  const winInputValueWei = web3.utils.toBN(web3.utils.toWei(winInputValue.toString()));
  const predictionMarketContract = new web3.eth.Contract(predictionMarketAddressABI, predictionMarketAddress);
  predictionMarketContract.setProvider(window.ethereum);
  await predictionMarketContract.methods.placeBet(0).send({from: ethereum.selectedAddress, value: winInputValueWei});
}

// Place Bet against:
const looseSubmit = document.getElementById('input-button-loose');
looseSubmit.onclick = async () => {
  const loosenInputValue = document.getElementById('input-box-loose').value;
  var web3 = new Web3(window.ethereum);
  const looseInputValueWei = web3.utils.toBN(web3.utils.toWei(winInputValue.toString()));
  const predictionMarketContract = new web3.eth.Contract(predictionMarketAddressABI, predictionMarketAddress);
  predictionMarketContract.setProvider(window.ethereum);
  await predictionMarketContract.methods.placeBet(1).send({from: ethereum.selectedAddress, value: winInputValueWei});
}

const getBetsPerUser = document.getElementById('bets-per-user');

getBetsPerUser.onclick = async () => {
  var web3 = new Web3(window.ethereum);
  const predictionMarketContract = new web3.eth.Contract(predictionMarketAddressABI, predictionMarketAddress);
  predictionMarketContract.setProvider(window.ethereum);
  var betsInFavour = await predictionMarketContract.methods.betsPerUser(ethereum.selectedAddress, 0).call();
  var betsAgainst = await predictionMarketContract.methods.betsPerUser(ethereum.selectedAddress, 1).call();

  const displayValue = document.getElementById('display-value')

  displayValue.innerHTML = 'Your Bets in Favour: ' + (betsInFavour / 10 ** 18) + 'ETH, Your Bets Against: ' + (betsAgainst / 10 ** 18) + 'ETH';
    

}
