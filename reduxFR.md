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
