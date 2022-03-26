after installing everything (ts-node, solana-cli, metaplex and such. the easy parts)

- create an empty folder with mkdir. (in this case, it's named solana-nft)
- cd into it
- inside the folder, enter the following command => solana-keygen new --outfile ./keypair.json
- still inside the same folder, clone the metaplex github repo => https://github.com/metaplex-foundation/metaplex/

- go to metaplex/js folder and enter this command on the terminal => yarn install
- now we're gonna configure the solana network and our keypair.json file. For that, go back to the root folder.
- this command sets the devnet (for real world applications, you'd use mainnet) => solana config set --url https://api.devnet.solana.com
- this is for the keypair.json => solana config set --keypair keypair.json
- now we're gonna configure the settings for the candy machine
- create a config.json file in the root folder and add configuration. You can find the configuration docs here => https://docs.metaplex.com/candy-machine-v2/configuration
- once you do that, copy the wallet address you've created inside the config.json file
- change the date. Also storage from arweave-sol to arweave as we'll be working on the devnet only.
- create an assets folder in the root directory and add the assets there (with the metadata and all). Note that assets in solana start with an index of zero (0)
- command to upload the candy machine =>
  ```
  npx ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts upload \
    -e devnet \
    -k keypair.json \
    -cp config.json \
    ./assets
  ```
- if the above command fails, just run it again until it works.
- verify upload with this command =>
  ```
  npx ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts verify_upload \
    -e devnet \
    -k keypair.json
  ```
  - once we get the "ready to deploy!" message, we can try to mint one token from the command line by typing this =>

```
npx ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts mint_one_token \
    -e devnet \
    -k keypair.json
```

- to see our wallet in phantom wallet, first change phantom wallet into devnet, than go to keypair.json and copy the contents inside. One that's done, add/connect wallet with "import private key" option. Your wallet with the airdropped sol inside will be imported.

## creating the minting website

- go to metaplex/js/packages/candy-machine-ui
- change .env.example into .env only
- add public key there
- specify the mainnet (if you're on devnet, don't change anything)
- for the RPC_HOST too, if you were using the mainnet, you'd have to change it. But for devnet, don't touch these two
- go to metaplex/js/packages/candy-machine-ui/ folder
- run yarn install && yarn start
- now you just need to style the application.Error: Invalid account discriminator
    at AccountClient.fetchNullable (
