## hardhat deployment

- Go to the root folder of your smart contract (not the project, the smart contract)
- npm init -y
- npm install dotenv
- npm install --save-dev hardhat
- npx hardhat (it'll install the required dependencies for you)
  If it does not install the required dependencies for you, here they are =>
  `npm install --save-dev @nomiclabs/hardhat-waffle@^2.0.0 ethereum-waffle@^3.0.0 chai@^4.2.0 @nomiclabs/hardhat-ethers@^2.0.0 ethers@^5.0.0 `

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

`````ALCHEMY_RINKEBY_URL=YOUR_ALCHEMY_RINKEBY_URL
RINKEBY_PRIVATE_KEY=YOUR_PRIVATE_KEY````

`````
