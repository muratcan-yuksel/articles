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

Mine are as follows =>

```
Wrote new keypair to ./keypair.json
==================================================================================
pubkey: 91KURDG87M6NNhhyQ9gBfNe4N8ujidjorpwemq6NRHA9
==================================================================================
Save this seed phrase and your BIP39 passphrase to recover your new keypair:
giant stock valid cry language decrease genre loop reduce december observe benefit
==================================================================================
```

Do not share this information with anyone. I'm cool posting it as I'll delete is as soon as I'll finish with this guide.

Still inside the same solana-nft folder, clone the Metaplex GitHub repo => `git clone git@github.com:metaplex-foundation/metaplex.git`

Now you'll have a folder `metaplex` in your solana-nft directory. Next, cd into metaplex/js folder and run the following command `yarn install`

Now we're going to set our application into devnet as we wouldn't like to spend any money for learning purposes. Mark that for real worl applications, we'd need use the mainnet. Anyway, go back to your solana-nft root folder and run the following command => ` solana config set --url https://api.devnet.solana.com` It should return confirmed.
