# Hardhat Fund Me

This time I'll be using yarn

```bash
yarn add --dev hardhat
```

then, yarn hardhat

## solhint

install https://www.npmjs.com/package/solhint

then change the solhint.json as such

```json
{
  "extends": "solhint:recommended",
  "rules": {
    "compiler-version": ["error", "^0.8.0"],
    "func-visibility": ["warn", { "ignoreConstructors": true }]
  }
}
```

or something else if you want.

## prettier

https://www.npmjs.com/package/prettier-plugin-solidity

and .prettierrc

```json
{
  "tabWidth": 4,
  "useTabs": false,
  "semi": false,
  "singleQuote": false
}
```

## starting

install `yarn add --dev @chainlink/contracts` then run `yarn hardhat compile`

## hardhat deploy

we install the hardhat-deploy package from https://www.npmjs.com/package/hardhat-deploy with `yarn add --dev hardhat-deploy` and then we add the following to the hardhat.config.js

```js
require("hardhat-deploy");
```

now we can delete our deploy.js file in scripts. And we create a new folder in the root called `deploy`, we'll write our deploy scripts here.

We also install hardhat deploy ethers package as such => `yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers`

package https://www.npmjs.com/package/hardhat-deploy-ethers

then add this line into the hardhat.config.js

```js
require("@nomiclabs/hardhat-ethers");
```

now we can write our deploy scripts in the deploy folder.

in deploy folder, we create a new file called `01_deploy-fund-me.js`

```js
function deployFunc() {
  console.log("hi");
}

module.exports.default = deployFunc;
```

when we run `yarn hardhat deploy` we've had ran the function.

Now, in the hardhat deploy docs, you might see the syntax like so =>

```js
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("MyContract", {
    from: deployer,
    args: ["Hello"],
    log: true,
  });
};
```

Like, instead of writing a function and then exporting the module at the end, this one exports the function directly. There's almost no difference says Patrick, so I'll be using the latter syntax to make sure everything works.

Now, in 01_deploy-fund-me.js, we'll write the following

```js
const { network } = require("hardhat");

function deployFunc(hre) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = getNamedAccounts();
  const chainId = network.config.chainId;
}

// we can also get thhem from hre as such you know
// function deployFunc({ getNamedAccounts, deployments }) {

//   }

module.exports.default = deployFunc;
```

and in our hardhat.config.js we add this line

```js
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.8",
  //this part
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
```

that means that the default account is the first account in the mnemonic.

BRO, here, we're refactoring the code so that we can use any chain we want with aggregator and stuff. It's tough.

Look, in FundMe.sol, we change these:

```solidity
    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAdress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAdress);
    }

    function fund() public payable {
        require(
            msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
            "Didn't send enough!"
        );
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }
```

You see, we add a pricefeed into the constructor method.
Then we go to PriceConverter.sol and change it as such

```solidity
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(AggregatorV3Interface priceFeed)
        internal
        view
        returns (uint256)
    {
        // //the function that we take the price in terms of USD
        // //ABI
        // //Adress
        // AggregatorV3Interface priceFeed = AggregatorV3Interface(
        //     0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        // );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        //ETH in terms of USD
        //3000.00000000
        return uint256(price * 1e10);
    }

    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        //this is the function that takes the ethAmount and returns the amount in terms of USD
        uint ethPrice = getPrice(priceFeed);
        uint256 ethAmountInUSD = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUSD;
    }

    // function getVersion() internal view returns (uint256) {
    //     // an AggregatorV3Interface variable called priceFeed
    //     AggregatorV3Interface priceFeed = AggregatorV3Interface(
    //         0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
    //     );
    //     return priceFeed.version();
    // }
}

```

## data feeds, again

remember chainlink data feeds? https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon

Now, this is our deploy-fund-me.js

```js
const { networkConfig } = require("../helper-hardhat-config");
const { network } = require("hardhat");

function deployFunc(hre) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = getNamedAccounts();
  const chainId = network.config.chainId;

  //if chainId is X use address Y etc.

  const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];

  const fundMe = deploy("FundMe", {
    from: deployer,
    args: [
      // address
    ], //put pricefeed address
    log: true,
  });
}

// we can also get thhem from hre as such you know
// function deployFunc({ getNamedAccounts, deployments }) {

//   }

module.exports.default = deployFunc;
```

In the root, we create `helper-hardhat-config.js` and put this in it

```js
const networkConfig = {
  //goerli chain id is 5
  5: {
    name: "goerli",
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
  },
  //polygon id is 137
  137: {
    name: "polygon",
    ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
  },
};

module.exports = { networkConfig };
```

I got those feeds from the chainlink data feeds I've posted at the beginning of this subsection.

## deploy mocks

In deploy folder I create `00-deploy-mocks.js` and put this in it

```js
const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
};
```

Then I create `contracts/test` folder and create `MockV3Aggregator.sol` and put this in it

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/tests/MockV3Aggregator.sol";

```

This takes something from the chainlink repo.

Now if I wanted to compile this, it would give an error because this contract's version is 0.6.0 and our contract is 0.8.8. So we need to go back to hardhat.config.js and add multiple compilers

```js
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  // solidity: "0.8.8",
  solidity: {
    compilers: [
      {
        version: "0.8.8",
      },
      {
        version: "0.6.6",
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
```

Now it will compile

## fake pricefeed
