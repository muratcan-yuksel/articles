Gestion globale de l'état dans React.js avec redux-toolkit (un guide pratique)

Dans cet article, je vais essayer d'aider les autres à commencer par la gestion globale de l'état dans React.js avec Redux Toolkit.

Remarque : pour autant que je sache, Redux Toolkit ne fonctionne pas avec les applications créées avec vite, j'utilise create-react-app et je m'attends à ce que vous ayez les mêmes opportunités que create-react-app fournisse.

Nous allons créer une application de React.js très simple qui stockera les données dans notre "store" et les affichera sur le composant que nous souhaitons. L'application comprendra trois composants. La structure des dossiers sera la suivante :

```
-src
--components (folder)
---FirstComp.js
---SecondComp.js
---ThirdComp.js
--features(folder)
---myStore.js
--App.js
--index.js
```

## Construire le store

Je ferai de mon mieux pour m'abstenir de la terminologie, car je ne pense pas que je l'ai compris assez bien. L'important, c'est que tout ce que je vais montrer maintenant fonctionne comme un charme, et c'est facile.

Nous allons commencer par installer les dépendances dans notre dossier de projet comme indiqué dans le guide officiel de redux toolkit,

`npm install @reduxjs/toolkit react-redux`

Si les packages sont installés. Il est temps de construire le store. Pour cela, nous devrons modifier notre index.js et myStore.js dans notre dossier de features. Notez que ces noms sont totalement aléatoires et à vous.

## myStore.js

Dans myStore.js dans le dossier des features, écrivons le code suivant :

```
import { createSlice } from "@reduxjs/toolkit";

export const initialStateValue = "";

export const theStore = createSlice({
  name: "theStore",
  initialState: { value: initialStateValue },
  reducers: {
    getData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getData } = theStore.actions;

export default theStore.reducer;
```

Qu'est-ce qu'il se passe ici?

- Nous importons createSlice depuis Redux Toolkit
- Créer une variable initialStateValue (ce dont nous n'avons pas forcément besoin, comme vous pouvez le voir, je l'utilise pour rendre le code plus propre)
- Créez et exportez une slice nommée theStore (le nom peut être ce que vous voulez)

À l'intérieur de notre slice,

- On lui donne un nom
- initier un état et lui donner une valeur, qui ressemble à peu près à l'état du hook useState
- Définir les réducteurs. Ici, "getData" peut être nommé comme vous le souhaitez. Il faut deux paramètres : l'état et l'action. L'état est notre état initial, et l'action (qui prend un payload) est essentiellement les données que nous obtiendrons de nos composants.

- Et nous exportons les choses comme indiqué.

Comme je l'ai mentionné, je ne pense pas que nous ayons besoin de savoir ce que chaque chose fait ici pour démarrer avec Redux Toolkit. Je ne me souviens même pas de ce que chaque chose faisait, et je m'en fiche vraiment.

Maintenant, allons à notre index.js et assurez-vous que notre application peut utiliser ce store.

## index.js

Dans index.js, collons ce code :

```
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//add the following to use Redux
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import dataReducer from "./features/myStore";

const store = configureStore({
  reducer: {
    theStore: dataReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

Comme vous pouvez le voir, la différence avec un fichier index.js habituel est que nous avons importé les éléments suivants :

```
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import dataReducer from "./features/myStore";
```

Configurer notre store avec le dataReducer que nous avons importé de myStore.js,

```
const store = configureStore({
  reducer: {
    theStore: dataReducer,
  },
});
```

(Notez que ce "dataReducer" aurait pu être nommé n'importe quoi. Son nom dépend entièrement de vous.)

Et enfin, enveloppé notre application avec le fournisseur de store,

```
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

Avec ces changements, notre store devrait être prête et nous pouvons commencer à la définir ou à en obtenir des données. Commençons alors à travailler sur nos composants.

## Composants : FirstComp.js

Dans notre FirstComp.js, nous collons les lignes suivantes :

```
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../features/myStore";

const FirstComp = () => {
  const dispatch = useDispatch();
  //we're not using data in this component
  //const data = useSelector((state) => state.theStore.value);

  const sendData = () => {
    dispatch(getData("Hello from the first component"));
  };

  return (
    <div>
      <button onClick={sendData}>Send data</button>
    </div>
  );
};

export default FirstComp;
```

Ce qui se passe ici, comme vous pouvez le voir, c'est que nous importons useSelector et useDispatch de react-redux, et notre fonction getData de myStore.js. À l'intérieur de la fonction, nous créons une variable de dispatch. Cette variable de dispatch est responsable de l'envoi des données souhaitées au store. Et nous créons une variable de données qui, en utilisant useSelector, récupère l'état de notre store.

Dans les termes du hook useState, ce que nous avons fait est assez similaire à ce qui suit : `const [state, setState]= useState("") ` => Ici, state étant la variable de données, setState fonctionnant de manière similaire à la variable de dispatch, et le les données gérées dans notre myStore.js étant la valeur dans le hook useState.

Dans la fonction sendData, nous utilisons dispatch sur la fonction getData pour le modifier avec notre message ("Bonjour du premier composant"). Le bouton active la fonction sendData au clic.

Maintenant, au moment où nous cliquons sur le bouton affiché, notre store global prendra la valeur invoquée par "dispatch".

Vous voyez que nous n'utilisons pas la variable de données, c'est-à-dire les données de notre store global. Je l'ai juste mis là pour que nous puissions être sûrs que si nous voulions afficher les données, même dans ce même composant que les données ont été fournies, nous pourrions le faire très facilement simplement en le retournant, et c'est ainsi que nous obtiendrons le les données du store global de toute façon.

## Composants: SecondComp.js

Notre deuxième composant est presque le même que le premier. La seule différence réside dans le message qu'il envoie. Regardez-le:

```
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../features/myStore";

const SecondComp = () => {
  const dispatch = useDispatch();
  //we're not using data in this component
  //const data = useSelector((state) => state.theStore.value);

  const sendData = () => {
    dispatch(getData("Hello from the SECOND component"));
  };

  return (
    <div>
      <button onClick={sendData}>Send data</button>
    </div>
  );
};

export default SecondComp;
```

Donc, maintenant, chaque fois que je clique sur tel ou tel bouton, la valeur du store global reflétera le composant sur lequel le bouton a été cliqué. Maintenant, nous aimerions probablement afficher les données que nous avons stockées globalement quelque part.

## Composants: ThirdComp.js

Dans notre fichier ThirdComp.js, écrivons ces lignes :

```
import React from "react";
import { useSelector } from "react-redux";

const ThirdComp = () => {
  const data = useSelector((state) => state.theStore.value);

  return <div>{data}</div>;
};

export default ThirdComp;
```

Notez que nous n'avons ni importé ni utilisé dispatch. Parce que nous n'en avons pas besoin. Nous n'allons pas changer l'état de ce composant, nous allons juste l'afficher. Nous avons donc notre useSelector de react-redux, et l'utilisons sur une variable de données (encore une fois, le nom peut être tout ce que nous voulions)

Ajoutons maintenant nos composants dans notre fichier App.js.

## App.js

```
import FirstComp from "./components/FirstComp";
import SecondComp from "./components/SecondComp";
import ThirdComp from "./components/ThirdComp";

function App() {
  return (
    <div className="App">
      <div style={{ border: "2px solid black" }}>
        <FirstComp />
      </div>
      <div style={{ border: "2px solid red" }}>
        <SecondComp />
      </div>
      <ThirdComp />
    </div>
  );
}

export default App;
```

Maintenant, si nous avons tout fait correctement, nous devrions voir deux boutons et chaque fois que nous cliquons sur l'un d'eux, nous devrions voir leurs messages respectifs sur notre écran. Maintenant, ici, j'ai utilisé une structure très basique et vous vous demandez peut-être pourquoi auriez-vous besoin de Redux Toolkit pour faire quelque chose d'aussi basique, et je dirais que vous ne savez jamais à quel point les choses peuvent devenir compliquées, et il vaut mieux savoir comment gérer la complexité que non.

C'est tout pour aujourd'hui mes ami/e/s !

Bon codage !
