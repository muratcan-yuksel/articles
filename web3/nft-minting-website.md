# NFT Mınting Website

### Dependencies

Tutorial link => https://www.youtube.com/watch?v=ynFNLBP2TPs&t=2s&ab_channel=EdRoh

We start by create-react-app and then install hardhat by `npm i -D hardhat`

- `npx hardhat`
- `npm i @openzeppelin/contracts`
- `npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion`

## Project

Start by creating a smart contract in the `contracts` folder named `RoboPunksNFT.sol`

This is our contract =>

```solidity
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunksNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    //the owner can toggle this to allow minting
    bool public isPublicMintEnabled;
    //uri of where the images will be located
    string internal baseTokenUri;
    //we're not gonna code withdraw functionality
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721("RoboPunks", "RP") {
        mintPrice = 0.02 ether;
        //we start with a zero
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        //set withdraw wallet address here
        //he doesn't do it, you have to
    }

    //owner is set as msg.sender by default by openzeppelin's Ownable.sol contract
    function setIsPublicMintEnabled(bool _isPublidMintEnabled)
        external
        onlyOwner
    {
        isPublicMintEnabled = _isPublidMintEnabled;
    }

    function setBaseTokenURI(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    //this tokenURI function already exists in ERC721, we override it because
    //we've defined our own baseTokenURI

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(_tokenId), "Token does not exist!");
        //we take the uri that we've identified
        //grab the id and place it behind the uri and add .json to the end
        //so that opensea grabs every single uri of the images
        //get's how your images gets displayed on opensea
        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    function withdraw() external onlyOwner {
        //the ('') at the end measn we're passing the call without any data
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success, "Withdraw failed");
    }

    function mint(uint256 _quantity) public payable {
        require(isPublicMintEnabled, "Public minting is not enabled");
        require(msg.value == mintPrice * _quantity, "Incorrect value sent");
        require(totalSupply + _quantity <= maxSupply, "Sold out");
        require(
            walletMints[msg.sender] + _quantity <= maxPerWallet,
            "Max per wallet exceeded"
        );

        for (uint256 i = 0; i < _quantity; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            //_safeMint exists in ERC721 contract
            //the reason it comes after the above line is to prevent reentrancy attacks...
            _safeMint(msg.sender, newTokenId);
        }
    }
}
```

## deploy.js

Then we go to `scripts/deploy.js`

This is our `deploy.js` file =>

```javascript
const hre = require("hardhat");

async function main() {
  const RoboPunksNFT = await hre.ethers.getContractFactory("RoboPunksNFT");
  const roboPunksNFT = await RoboPunksNFT.deploy();
  await roboPunksNFT.deployed();
  console.log("RoboPunksNFT deployed to:", roboPunksNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

## deploying

I added `dotenv` package.

### Using Infura

We go to Infura, and create a new ethereum project. Then choose `görli` endpoint. save the endpoint that starts with `https://goerli.infura.io...` to the env file.

Then go to `etherscan.io`. We need the API key from there. I create new API key and save it to the env file.

Then I go to `hardhat.config.js` and add the following import and initialize it. Then, I go to the module exports and add the variables from the env file as such=>

```javascript
//final version
require("@nomicfoundation/hardhat-toolbox");
//we add this in the following section
require("@nomiclabs/hardhat-etherscan");
const dotenv = require("dotenv");
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: process.env.INFURA_GOERLI_RPC_URL,
      accounts: [process.env.MY_PRIVATE_KEY],
    },
  },
  //note that etherscan is outside of networks object
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
```

After that, I run the following commands on the terminal to compile and deploy =>

```
- npx hardhat clean
- npx hardhat compile
- npx hardhat run scripts/deploy.js --network goerli
```

### Verifying our contract

We get the deployed contract address from the terminal message and go to goerli.etherscan.io, look it up, choose `contract` section and see the non-human readable bytecode. We want to verify.

To do this, we need to install the following package => `npm i -D @nomiclabs/hardhat-etherscan`

Then, we run the following command => `npx hardhat verify --network goerli deployedContactAddress`

Now if we go back to etherscan, we can see our smart contract.

#### getting contract abi

Now we go to `artifacts/RoboPunksNFT.json` and copy all the contents inside. Then, we create a `RoboPunksNFT.json` file IN `src/contract` folder and paste everything into it.

## Coding the frontend

We add `MainMint.js` and `Navbar.js` into a new folder `src/components` and import them into `App.js`

## important note

After finishing the app, you can't mint. Because we se isPublicMintEnabled to false in our contract. To change that, you go to the etherscan, to where your contract is, click to write contract, CONNECT WITH THE WALLET THAT DEPLOYED THE CONTEACT, and write `true` on `_isPublidMintEnabled (bool)` function.

Although I got an error. Maybe I used a different address to deploy the contract, as I have 2 disposable wallets. I don't know. But the idea is cool.

Yeap, that's the reason. I used a different wallet to deploy.

---

I won't post all the app here. You can check it out later. The thing to get is using background images like that is better than how I was doing it.
