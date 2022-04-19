- copy your ABI (you can find it in the solidity compiler section in remix IDE, at the very left bottom, under the compilation details button)
- save the ABI in somewhere safe.
- the ABI is in JSON format
  ## note that we're doing these things on polygon
  not that it matters but, the file names are according to that
  so don't let that confuse you
  ## end of NB
- create a new file in the info folder that holds the information that'll be useful later, and name that file `polygon_contract`
- paste your whole contract in that file

## verifying smart contract

- copy your contract address (that you've saved in a file, it's a one-liner)
- search for your contract address on etherscan or polygonscan (depends on which blockchain you've deployed it to)
- if it's live, you can see it.
- there, you'll click the contract section. After clicking it, you'll see you can read and write contract, but also you need to verify it. Click that `verify your contract source code` link.
- for compiler type, select a single file
- after clicking that, you'll choose you compiler version
- to find out the license, you'll check your own licence, generally it's MIT as you know
- check optimization on if you've said yes to it on remix compiler
- paste your contract to the relevant field
- for ABI-encoded field, go to that loooong bunch of numbers and letters you've saved for future reference (this is the time), and check it carefully. YOU WILL NOT PASTE ALL OF IT. No, you'll paste only some part of it. What part?
- go to the end of that thing, and you'll see bunch of 0's (zeroes). Now, look for the last point of zeroes from the end to the up, and select from the first zero starting. Okay, this is complicated to write, let me show you with an example. So, I copied around the last part of that code :

````
146142b357600080fd5b50565b6142bf81613adb565b81146142ca57600080fd5b50565b6142d681613b27565b81146142e157600080fd5b5056fea26469706673582212204282141108d6ca091ea1437ffce01da9b23df3d4962cafb11ddcbc1807f86ba964736f6c63430008070033```000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000e4579655f436f6c6c656374696f6e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000345204300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000036697066733a2f2f516d504e536a71564367734b65584138756259386f73355756326b794c5935737a784a7741685a6832316b4270462f00000000000000000000```
````

See? Now you'll only select after the part I've indicated with the second line of three backticks (```)

- click verify and you're done.
- NB ! In write contract section, at the end, you'll see a withdraw field. It's actually the same thing as the `value` field on remix. Daniel puts 0 there. This withdraws I guess.
