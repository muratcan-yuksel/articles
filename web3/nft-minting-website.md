# NFT Mınting Website

### Dependencies

Tutorial link => https://www.youtube.com/watch?v=ynFNLBP2TPs&t=2s&ab_channel=EdRoh

We start by create-react-app and then install hardhat by `npm i -D hardhat`

- `npx hardhat`
- `npm i @openzeppelin/contracts`
- `npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion`

## Project

Start by creating a smart contract in the `contracts` folder named `RoboPunksNFT.sol`

We start as such =>

```solidity
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunksNFT is ERC721, Ownable{

}
```
