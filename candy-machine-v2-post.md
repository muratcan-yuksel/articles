# Building Metaplex Candy Machine v2 for NFT collection on Solana Blockchain

In this guide, I'll try my best to walk you through how to create a Metaplex Candy Machine v2 (2022). I'll be focusing on how to do so using Linux, as it is my preferred OS. To start, we need to install some things.

I presume that you have a Phantom Wallet, as I'll import the wallet we'll create into my main Solana wallet, and I'll use Phantom Wallet. If you wish to do otherwise, proceed with caution.

## Installations

If you check the Metaplex documentation for Candy Machine v2, you'll see that in order to proceed, you'll need git, node, yarn and ts-node. Required information can be found here => https://docs.metaplex.com/candy-machine-v2/getting-started

You'll also need the Solana CLI to interact with Solana blockchain. For that, I suggest you check out this page => https://docs.solana.com/cli/install-solana-cli-tools

Now, one thing I'd like to add that is if you're using fish in your terminal (I do, since I use Garuda Linux) the following command will not work as expected: `sh -c "$(curl -sSfL https://release.solana.com/v1.9.8/install)"` One solution I found to deal with the problem is to install another terminal that uses bash primarily. I used Tilix to run the above command and it worked perfectly. If you do not use fish, ignore this paragraph.

## Starting out with the application

Now, create an empty folder with mkdir command in your terminal. I'll name this folder `solana-nft`. Inside the folder, run the following command to create a solana wallet `solana-keygen new --outfile ./keypair.json` .

Save the message you see in your terminal somewhere safe, as we'ell use the pubkey and seed phrase later on.

Still inside the same solana-nft folder, clone the Metaplex GitHub repo => `git clone git@github.com:metaplex-foundation/metaplex.git`

Now you'll have a folder `metaplex` in your solana-nft directory. Next, cd into metaplex/js folder and run the following command `yarn install`

Now we're going to set our application into devnet as we wouldn't like to spend any money for learning purposes. Mark that for real worl applications, we'd need use the mainnet. Anyway, go back to your solana-nft root folder and run the following command => ` solana config set --url https://api.devnet.solana.com` It should return confirmed.

Next, run the following command => `solana config set --keypair keypair.json` This one should return confirmed also.

Our next step is to configure the settings for the candy machine. To do that, create a config.json file in the root folder. To learn more about the configuration, check out the official docs => `https://docs.metaplex.com/candy-machine-v2/configuration` I will use the default configuration, which is seen as follows:

```
{
  "price": 1.0,
  "number": 10,
  "gatekeeper": null,
  "solTreasuryAccount": "<YOUR WALLET ADDRESS>",
  "splTokenAccount": null,
  "splToken": null,
  "goLiveDate": "25 Dec 2021 00:00:00 GMT",
  "endSettings": null,
  "whitelistMintSettings": null,
  "hiddenSettings": null,
  "storage": "arweave-sol",
  "ipfsInfuraProjectId": null,
  "ipfsInfuraSecret": null,
  "awsS3Bucket": null,
  "noRetainAuthority": false,
  "noMutable": false
}

```

We need to make some changes into it though.

First, delete the value for `solTreasuryAccount` and add your solana wallet address we've come to create. You can find that address from the pubkey you've saved earlier, or you can just type `solana address` on your terminal and paste it there.

Then, change the storage from arweave-sol to arweave, as we're on the devnet.

Once you've done that, create an assets folder in the root directory (solana-nft). Now we need to put our assets (images and metadata and all) inside that assets folder. If you don't have any assets, no worries. You can download the sample assets from the Metaplex official docs => `https://docs.metaplex.com/candy-machine-v2/preparing-assets`

The next step is to upload the candy machine.

Before doing that, we need some fake Solana. Since we're in the devnet, you can easily get some sol by running `solana airdrop 2` in the terminal. If that fails, as it sometimes does, go to `https://solfaucet.com/` and add your wallet address there.

Now let's return to uploading the candy machine we've just configured. To do that, run the following command =>

````
npx ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts upload \
    -e devnet \
    -k keypair.json \
    -cp config.json \
    ./assets
    ```
````

This command might fail. Don't worry. Just run it until it uploads everythng successfully.

Verify the upload with the following command =>

```
  npx ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts verify_upload \
    -e devnet \
    -k keypair.json
```

If everything goes alright, you'll get a "ready to deploy!" message.

Now we can try to mint one token from the command line with the following command =>

```
npx ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts mint_one_token \
    -e devnet \
    -k keypair.json
```

Now it's time to see this minted NFT in our wallet. Remember how I mentioned at the beginning that I have one main Phantom Wallet, let's go to that. We'll import this wallet into the main one. To do that, open the keypair.json file and copy the contents inside.

Go to your Phantom Wallet, and change it into devnet. Once yoU've done that, click the menu button on the top left, and choose `Add/Connect Wallet`. Then choose `import private key/import an existing wallet` , name it whatever you wish and copy the contents of the keypair.json that you've copied.

That's it. You can see the minted NFT in your wallet now.
