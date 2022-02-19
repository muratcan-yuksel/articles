after installing everything (ts-node, solana-cli, metaplex and such. the easy parts)

- create an empty folder with mkdir. (in this case, it's named solana-nft)
- cd into it
- inside the folder, enter the following command => solana-keygen new --outfile ./keypair.json
- still inside the same folder, clone the metaplex github repo => https://github.com/metaplex-foundation/metaplex/

- go to metaplex/js folder and enter this command on the terminal => yarn install
- now we're gonna configure the solana network and our keypair.json file. For that, go back to the root folder.
- this command sets the devnet (for real world applications, you'd use mainnet) => solana config set --url https://api.devnet.solana.com
- this is for the keypair.json => solana config set --keypair keypair.json
