## Hardht simple storage

To start, we go into our empty folder and run `npm init -y` + `npm install --save-dev hardhat`

To initiate the hardhat project `npx hardhat`

## Trouble shooting

If you can't see `hardhat.config.js` file after installation, it's generally because you have a node modules or hardhat.config.js in the parent folder. You can either delete the parent folder or rename the file.

`npx hardhat --verboce` will help you find the fle you'll want to delete.

## deployment

First, we run `npx hardhat compile`

If you get an error similar to this

```
Error HH606: The project cannot be compiled, see reasons below.

The Solidity version pragma statement in these files doesn't match any of the configured compilers in your config. Change the pragma or configure additional compiler versions in your hardhat config.

  * contracts/SimpleStorage.sol (0.8.7)

To learn more, run the command again with --verbose

Read about compiler configuration at https://hardhat.org/config

```

go to hardhat.config.js and change the solidity compiler version to the one you're using in your contract.

### writing the deploy script

Go into deploy.js

Installs prettier solidity with `npm i --save-dev prettier-plugin-solidity`
and creates a `.prettierrc` file with the following content

```
{
  "tabWidth": 4,
  "useTabs": false,
  "semi": false,
  "singleQuote": false
}

```

Then, we go back to deploy.js and import ethers from hardhat directly

```
//imports

const { ethers } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying SimpleStorage...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log("deployed contract to" + simpleStorage.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
```

and I run `npx hardhat run scripts/deploy.js`

This is all it takes to deploy a contract with hardhat.

## networks in hardhat

Similar to ganache, hardhat comes with its own private network. That's why we didn't need private key and rpc url in our deployment. Also, we can change the network in hardhat.config.jj. If we don't write anything, it has this `   defaultNetwork: "hardhat",` by default.

Now above, it just deploys to hardhat's network. Here, I want it to deploy to goerli. To do that, first off I need to go to `Alchemy`, create a new project, and get its https link from there. Then, I'll need my private key. I'll go to `metamask` and copy my private key. I install `dotenv` package and then, I'll go to `hardhat.config.js` and add the following

Of course, beforehand I need to add the necessary details into my .env file.

```
require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

const GOERLI_RPC_KEY = process.env.GOERLI_RPC_KEY
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${GOERLI_RPC_KEY}`,
            accounts: [GOERLI_PRIVATE_KEY],
            chainId: 5,
        },
    },

    solidity: "0.8.7",
}
```

This `chainId` can be found in https://chainlist.org/

Since deployment is done for goerli network, I'll run `npx hardhat run scripts/deploy.js --network goerli` and after succesfull deployment, I can go to https://goerli.etherscan.io/ and search for my contract address.

## programatic verification

He talks about contract verification, writes a verify function in deploy js, goes and registers to etherscan, takes an API key there and does things but I'm not gonna go over it. Why? Because ehterscan is faulty RN. Like, I registered, but can't login, asked for new pass twice, still can't log in. Their end is problematic.

Also my contract is already verified by default. Maybe things have changed since the tuto.

## interacting with the contracts in hardhat

I go and add the last lines into my main function in deploy.js

```javascript
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying SimpleStorage...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log("deployed contract to" + simpleStorage.address);

  const currentValue = await simpleStorage.retrieve();
  console.log("current value is", currentValue.toString());

  //update the current value
  //calling the store function from my SimpleStorage contract
  const transactionResponse = await simpleStorage.store(5);
  //wait for 1 block
  await transactionResponse.wait();
  const updatedValue = await simpleStorage.retrieve();
  console.log("updated value is", updatedValue.toString());
}
```

I've just interacted with my contract via here.

## custom hardhat tasks

I can create customs tasks that'll show up when I run npx hardhat. To do it, I create a tasks folder and inside it, I create block-number.js and inside it, I write the following

```javascript
const { task } = require("hardhat/config");

task("block-number", "Prints the current block number").setAction(
  // const blockTask = async function() => {}
  // async function blockTask() {}
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);
  }
);

module.exports = {};
```

Then I go back to my hardhat.config.js file and import it
`require("./tasks/block-number")`

Now, I can run `npx hardhat block-number` and it'll print the current block number. Alhough it doesn't. There's a problem but it's not important. This is how we add tasks.

## hardhat localhost node

`npx hardhat node` will show a list of test accounts just like ganache UI.
It is different from hardhat's private network. This is a localhost node.

If I wanted to interact with it, I'd need to go to hardhat.config.js and add the following

```javascript
        localhost: { url: "http://127.0.0.1:8545/", chainId: 31337 },
```

The url is given to me after I run npx hardhat node, can see it on the terminal. 31337 is the chainId of hardhat. Even though this is a localhost, it uses the same hardhat chainId.

Now, if I run `npx hardhat run scripts/deploy.js --network localhost` in a separate terminal it'll deploy to this localhost node, and will see the info on the terminal.

It's extremely quicker than working with a testnet.

## the hardhat console

I use this to tinker around with the blockchain without writing scripts.

I write ` npx hardhat console --network localhost` to open the console.

I could also write `npx hardhat console --network goerli` to open the console for goerli.

and I can just write whatever I want as if I'm writing functions in the script.

## running tests

`npx run hardhat clean` wil delete the artifacts and clean the cache.

Say I have a thousand test, and I fail in only one o them. And that one, uniquely, contains the word "store" in its description. I can get that particular test by running `npx hardhat test --grep store`
Another way to do that is to add `only` keyword after the `it` like so =>

````javascript
    it.only("should start with a fav number of 0", async () => {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })
    ```
````

This is the test we've done

```javascript
const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let simpleStorageFactory;
  let simpleStorage;
  //deploy the contract before each test instance
  //we assign our variables outside of beforeall so that we can use them in our tests
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("should start with a fav number of 0", async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
    //does the same thing
    // expect(currentValue.toString()).to.equal(expectedValue)
  });
  it("should update the fav number", async () => {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    //wait for 1 block
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
});
```

run `npx hardhat test` to run the tests.

## hardhat gas reporter

https://www.npmjs.com/package/hardhat-gas-reporter

Install gas reporter by `npm install hardhat-gas-reporter --save-dev`

Then I go to hardhat.config.js and update it as such =>

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
//imported gas reporter
require("hardhat-gas-reporter");

const GOERLI_RPC_KEY = process.env.GOERLI_RPC_KEY;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${GOERLI_RPC_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
      chainId: 5,
    },
    localhost: { url: "http://127.0.0.1:8545/", chainId: 31337 },
  },

  solidity: "0.8.7",
  //added gas reporter
  gasReporter: {
    enabled: true,
  },
};
```

now whenever I run tests, it'll automatically show me the gas report.

I also want to write the gas report to a file, so I go back to hardhat.config.js and add the following.

I also add this file to my .gitignore file.

```javascript

  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,


  },
```

Wow, now I can see the gas report in a file after I run the command.

If I wanted to see the report for say, Polygon, therefore for Matic, I'd write it like this =>

```javascript

  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: "MATIC",
  },
```

## solidity coverage

Solidity overage is an hardhat plugin that checks the tests, and tells you which lines of Solidity code are not covered by the tests.

https://www.npmjs.com/package/solidity-coverage

`npm i solidity-coverage`

Then I got back to my hardhat.config.js and import it like `require("solidity-coverage")`

Then I run `npx hardhat coverage`

with this, I'll also get a coverage.json file.

## for typescript check typechain
