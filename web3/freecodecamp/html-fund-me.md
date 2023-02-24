## html fund me

First thing I want to do on a website is to check whether they have metamask installed or not, and if installed, connect it.

```js
   <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fund Me App</title>
    </head>
    <body>
        hi

        <script>
            async function connect() {
                if (typeof window.ethereum !== "undefined") {
                    console.log("MetaMask is installed")
                    window.ethereum.request({ method: "eth_requestAccounts" })
                }
            }
        </script>
        <button id="connectButton" onclick="connect()">connect wallet</button>
    </body>
</html>

```
