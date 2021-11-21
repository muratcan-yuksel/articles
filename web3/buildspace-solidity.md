## first steps

-create a folder
-npm init -y
-npm install --save-dev hardhat
-npx hardhat
-(if not automatically installed)=> npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers

- npx hardhat compile
  -npx hardhat test

## writing contract

-Create a file named WavePortal.sol (whatever I mean) under the contracts directory.

```
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }
}
```

## build a script and run it
