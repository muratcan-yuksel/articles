# Utiliser WebSockets avec React

Pour mon dernier projet, j'ai dû utiliser Websockets pour créer un site Web qui affiche des données de trading en temps réel. Je ne connaissais rien aux WebSockets, et il m'a fallu quelques heures redoutables pour commencer. C'est le seul problème, en fait, pour commencer; le reste est assez clair. Ce court article espère aider les autres à économiser le temps qu'il m'a fallu pour en comprendre les bases.

La plupart des tutoriels sur le web mentionnent une syntaxe "require". Vous le savez. Lorsque vous souhaitez utiliser un certain outil, composant ou image dans votre composant en JS ou React, vous devez faire quelque chose comme `const qqch = require ("./dossier/qqch")` . Maintenant, comme je l'ai dit, la plupart des tutoriels que j'ai trouvés sur le Web commencent par cette syntaxe même, qui vous pousse à commencer à travailler avec WebSockets en utilisant la syntaxe require. C'est inutile, et peut-être même faux de nos jours. Je ne sais pas si cela fonctionne ou non, mais je suis certain que la façon dont j'utilise fonctionne parfaitement au moment où j'écris cet article le 09/12/2021. Alors, sans plus tarder, parlons de la façon dont nous pouvons utiliser ce protocole.

Cet article suppose que vous ayez une connaissance pratique de Vanilla JS et de React.js, que vous sachiez gérer le format json et le code asynchrone.

Je lance mon application avec vite (avec la commande suivante : npm init vite@latest et choisissez React dans le menu), mais vous pouvez utiliser votre propre structure, ou create-react-app. Cela n'a pas vraiment d'importance.

Pour une introduction plus approfondie sur WebSocket, visitez [javascript.info](https://javascript.info/websocket)

## Qu'allons-nous construire ?

Nous allons créer une application React.js très simple d'une page qui récupère les continuous-data de bitstamp.net et les affiche sur la page. Les données changeront tout le temps.

Le service que vous utilisez n'a pas vraiment d'importance, tant qu'il s'agit de WebSockets, le reste est de Vanilla JS.

## Construire le logiciel

Commençons par nous connecter au protocole WebSocket de bitstamp en écrivant le code suivant `const ws = new WebSocket("wss://ws.bitstamp.net");` Maintenant, en utilisant cette constant ws, nous pouvons nous abonner à n'importe quel canal défini sur le site Web de bitstamp et obtenir des données en temps réel à partir de là. Vous pouvez trouver toutes les informations concernant les canaux, les propriétés et tout à partir [d'ici](https://www.bitstamp.net/websocket/v2/)

Maintenant, abonnez-vous à une chaîne. Je vais m'abonner au canal oder_book_v2 et spécifier que je veux voir les taux de change btc/usd. Cet appel est défini dans le guide de bitstamp. Vous pouvez changer le canal et les devises comme vous le souhaitez. Voici l'appel :

```
 const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };
```

L'étape suivante consiste à envoyer cet appel au serveur en l'ouvrant =>

```
  ws.onopen = (event) => {
    ws.send(JSON.stringify(apiCall));
  };
```

Maintenant, nous voulons faire quelque chose avec chaque donnée. Donc, chaque fois que nous recevons un message du serveur, nous ferons quelque chose. Écrivons un code asynchrone avec try/catch

```

ws.onmessage = function (event) {
const json = JSON.parse(event.data);
console.log(`[message] Data received from server: ${json}`);
try {
if ((json.event = "data")) {

        console.log(json.data);
      }
    } catch (err) {
      // whatever you wish to do with the err
    }

};
```

Si nous ouvrons la console, nous verrions une grande quantité de données provenant du serveur. C'est ça, en fait. Nous avons les données, elles arrivent dans un flux, et nous pouvons faire ce que nous voulons avec eux. C'est si facile.

Cependant je veux afficher les données d'une manière particulière . Laissez-moi coller le code et je vous expliquerai immédiatement après :

```
import React, { useState } from "react";

function  App() {
  //give an initial state so that the data won't be undefined at start
  const [bids, setBids] = useState([0]);

  const ws = new WebSocket("wss://ws.bitstamp.net");

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };

  ws.onopen = (event) => {
    ws.send(JSON.stringify(apiCall));
  };

  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    try {
      if ((json.event = "data")) {
        setBids(json.data.bids.slice(0, 5));
      }
    } catch (err) {
      console.log(err);
    }
  };
  //map the first 5 bids
  const firstBids = bids.map((item) => {
    return (
      <div>
        <p> {item}</p>
      </div>
    );
  });

  return <div>{firstBids}</div>;
}

export default  App;
```

Alors, que se passe-t-il ici ? Comme vous pouvez le voir, il s'agit d'un composant très basique de l'application React.js. J'utilise useState hook donc je l'importe aussi avec react.

Je définis l'état et lui donne une valeur initiale.

Je procède comme indiqué précédemment, sauf que je définis l'état à json.data.bids (les offres étant une propriété du canal de live order et indiquées sur la page de bitstamp) et limite la quantité de données que je recevrai à 5, pour faciliter les choses.

Je mappe les données que je reçois, enregistrées dans l'état (comme vous le savez, React demande une clé pour chaque élément. Je ne l'utiliserai pas ici. J'utilise généralement uniqid pour cela, vous pouvez le faire vous-même.)

Je retourne les données mappées et voilà ! Si vous faites de même, vous devriez voir exactement 5 lignes de données en constante évolution à l'écran.

J'espère que cet article aidera quelqu'un.

Cordialement et continuez à coder!
