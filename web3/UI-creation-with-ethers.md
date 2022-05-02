- in your app.js import ethers and utils like so =>
  `import { ethers, utils } from "ethers"; `
- Create a folder called contracts in your react project src folder in your React App.
- Copy and paste over your Bank.json file from our smart contract lesson in our hardhat project. The file is found in ./artifacts/contracts/Bank.sol/Bank.json. It's commonly referred to as an Application Binary Interface (ABI) file and contains a JSON version of our contract that we can interface with.
- Import your ABI file into your project using import abi from "./contracts/Bank.json"; This line goes at the top of your App.js file.

- `import abi from "./contracts/Bank.json";`
- inside your App function (main function) specify these constants =>

`````
  const contractAddress = 'YOUR_CONTRACT_ADDRESS';
  const contractABI = abi.abi;````
`````
