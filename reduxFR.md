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
