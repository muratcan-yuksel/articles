# JWT authentication

npm i dotenv jsonwebtoken cookie-parser

To begin, we create a .env file in the root of our project and add the following:

ACCESS_TOKEN_SECRET =
REFRESH_TOKEN_SECRET =

To populate them, we go to the terminal and write `node` to initiate nodejs on the terminal.

Node has a core crypto module that we can use to generate random strings. We can use this to generate our secret keys.

`require('crypto').randomBytes(64).toString('hex')`

I use this twice, and paste the output into the .env file.

`(press alt +z to wrap the line in vscode)`
Then I exit the node environment.
