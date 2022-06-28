## with yarn v2

- go to the project folder and run `yarn set version berry`
- npm init -y
- yarn add hardhat
- yarn hardhat and choose `create an empty hardhat.config.js`
- add dependencies with `yarn add @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai`
- add this line to the top of your `hardhat.config.js` file => `require("@nomiclabs/hardhat-waffle");`
- when you write a smart contract, you can also compile it with `yarn hardhat compile` instead of `npx hardhat compile`
