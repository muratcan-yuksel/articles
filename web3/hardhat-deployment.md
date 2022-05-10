# hardhat deployment

## preparation

- Go to the root folder of your smart contract (not the project, the smart contract)
- npm init -y
- npm install dotenv
- npm install --save-dev hardhat
- npx hardhat
- install the following =>
  `npm install --save-dev @nomiclabs/hardhat-waffle@^2.0.0 ethereum-waffle@^3.0.0 chai@^4.2.0 @nomiclabs/hardhat-ethers@^2.0.0 ethers@^5.0.0 `

- delete the default greeter.sol in contracts, the test and script files in the test and scripts folders. DO NOT PASS THIS STEP.
- MOVE YOUR CONTRACT INTO THE CONTRACTS FOLDER

- go to hardhat.config.js and delete its contents. Replace them with =>

```require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: `${process.env.ALCHEMY_RINKEBY_URL}`,
      accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`],
    }
  }
};
```

(note that we specify rinkeby here, as we're on the test network)

- create a `.env` file and paste the necesssary infor there as such =>

```ALCHEMY_RINKEBY_URL=YOUR_ALCHEMY_RINKEBY_URL
RINKEBY_PRIVATE_KEY=YOUR_PRIVATE_KEY

```

## deployment

- make sure you're using the supported version of nodeJS for hardhat, it's generally the LTS version.
- write `npx hardhat compile ` on the terminal
  If it doesn't compile succesfully, enter this command and compile again `npx hardhat clean`
- Notice after we compiled our contract, we have a new folder called artifacts that contains two other folders build-info and contracts. Open those folders up and take a look around.

In contracts notice a file named Bank.json or what ever the name was of your smart contract. This will be super important because we will need it for our front-end to interact with our smart contract. This is essentially a JSON version of our smart contract. This is referred to as an ABI file, you can learn more about that here and read more about artifacts here.

- Now it's time to deploy our contract. In your scripts folder, create a new file called `deploy.js` and paste the following code.

```
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const [owner] = await hre.ethers.getSigners();
  const BankContractFactory = await hre.ethers.getContractFactory("Bank");
  const BankContract = await BankContractFactory.deploy();
  await BankContract.deployed();

  console.log("BankContract deployed to:", BankContract.address);
  console.log("BankContract owner address:", owner.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

```

- After you copy and paste the code into deploy.js, run the following to deploy to the Rinkeby test network.
  `npx hardhat run scripts/deploy.js --network rinkeby`
- save the addresses somewhere to use later on
