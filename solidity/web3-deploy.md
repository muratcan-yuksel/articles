- create a new alchemy app => network = ropsten, environment = staging
- create an empty project and initialize npm by `npm init -y`
- install hardhat => `npm install --save-dev hardhat`
- create an hardhat project => `npx hardhat`
- add project folders. We'll divide contracts and scripts =>
  mkdir contracts
  mkdir scripts
- install dot env `npm install dotenv --save`
- add your metamask private key and Alchemy API key into an .env file ( do not forget to gitignore)
  API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
  PRIVATE_KEY = "your-metamask-private-key"
- install ethers.js => `npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"`
- update hardhat.config.js as such =>

````
  /**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}```
````

- compile the contract => `npx hardhat compile`
- write the deploy script. To do that, go to scripts folder and create a deploy.js file. This is the code to write in it =>

```async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

- deploy the contract with => `npx hardhat run scripts/deploy.js --network ropsten`

## interacting with the smart contract

- create an `interact.js` file in scripts folder like so =>

````// interact.js

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;```
````

- update your .env file to contain the following:

API_URL = ""
API_KEY = ""
PRIVATE_KEY = ""
CONTRACT_ADDRESS = ""

-
