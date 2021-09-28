# Comment passer des données entre les composants React ?

Dans mon dernier projet, j'ai dû partager l'état entre de nombreux composants. La plupart d'entre eux ne partageaient pas un parent commun, donc passer un état avec des props et une callback fonction n'était pas une option, il serait gênant de le faire aussi. Par conséquent, j'ai utilisé l'API de contexte de React pour créer un état global et le partager entre tous les composants que je souhaitais. Dans ce tutoriel, je vais montrer comment y parvenir.

Avant de commencer, je dois remercier Dev Ed pour ce tutoriel éclairant. J'ai acquis et utilisé beaucoup de connaissances grâce à cette vidéo. Les développeurs qui préfèrent regarder des vidéos peuvent arrêter de lire et cliquer sur le lien suivant youtube.com/watch?v=35lXWvCuM8o&t=1790s c'est le même concept avec des exemples légèrement différents.

Notez que l'exemple que je vais donner ici est assez basique et que l'API React Context est suggérée pour être utilisée pour des instances plus complexes.

## Création de composants

Pour commencer, je crée 4 composants en dehors de App.js. Ces composants sont : -DataOne.js -DataTwo.js -Display.js -DataProvider.js

Il y a donc deux composants contenant des données et un composant qui affiche les données envoyées par ces deux composants. Un composant fournisseur existe pour garantir que l'état peut être partagé en douceur.

Commençons par le composant fournisseur.

## Le composant fournisseur

Regardez ce code:

```
import React, {useState, createContext} from 'react'

//note that we don't use export default here
//create context here, use context in others

//this DataContext will be shared by all the components
export const DataContext= createContext([]);

//this is our provider
export const DataProvider=(props)=>{

    const [data, setData]= useState([])

    return(
        <div>
<DataContext.Provider value={[data,setData]}>

{props.children}

</DataContext.Provider >

        </div>
    )

}
```

Que se passe t-il ici? J'importe les hooks useState et createContext de React, comme vous le voyez, ils sont intégrés de React.js. Comme je l'ai indiqué dans les commentaires, je n'utilise pas "export default" ici car il y a plus d'une fonction à exporter.

J'invoque le hook createContext dans la constante DataContext. Notez que vous pouvez donner le nom que vous souhaitez à la place de DataContext. Je précise que le contexte est un array pour mon utilisation future. C'est le contexte que j'appellerai dans d'autres composants avec le hook useContext. Nous verrons cela dans une minute.

Ensuite, je déclare le fournisseur dans DataProvider. Cette fonction est le fournisseur, ce qui signifie qu'elle contiendra et fournira les données nécessaires avec d'autres composants. On peut voir que je passe "props" entre parenthèses et que j'utilise {props.children} dans l'instruction return. Je déclare également un hook useState et le donne comme valeur du fournisseur. Qu'est-ce que tout cela signifie?

Pour que le fournisseur fournisse des données avec un certain composant, ce composant doit être présenté au fournisseur. Il y a deux manières que je connais de faire cela : Soit vous listez tous les composants que vous souhaitez partager entre eux comme ceci :

```
<DataContext.Provider value={[data,setData]}>

<Display.js/>
<DataOne.js/>
<DataTwo.js>

</DataContext.Provider >
```

ou vous utilisez {props.children} dans le cas où vous avez besoin de nombreux composants pour partager l'état. Je vais montrer comment activer cela dans la section suivante. Mais avant cela, je tiens à souligner que la valeur donnée à est les données qui seront partagées entre les composants. Si je donnais "Hello, world!" comme valeur, comme
`<DataContext.Provider value="Hello, world!">` tous les composants que je spécifie partageraient cette string unique. Dans mon cas, je veux que les données soient dynamiques, j'utilise donc un hook useState.

## Envelopper les composants pour partager l'état entre eux

```
import React from "react"
import Display from "./Display"
import DataOne from "./DataOne"
import DataTwo from "./DataTwo"
import {DataProvider} from "./DataProvider"

function App() {
  return (
    <div>
      <DataProvider>
        <DataOne />
        <DataTwo />
        <Display />
      </DataProvider>

    </div>
  );
}

export default App;
```

Ici, je viens d'importer les composants entre lesquels je souhaite partager l'état, plus {DataProvider} du composant fournisseur. Voyez que l'importation est entre curly brackets car il y a plus d'une fonction à importer dans ce composant, et j'ai seulement besoin de la fonction DataProvider ici.

Ensuite, je liste tous les composants avec lesquels je souhaite partager l'état. Désormais, DataOne.js, DataTwo.js et Display.js partageront les données.

Créons maintenant les deux autres composants qui enverront les données.

## Envoyer des données entre les composants

Découvrez cet extrait de DataOne.js :

```
import React, {useState, useContext} from 'react'
import { DataContext } from './DataProvider'

// using curly brackets bcs we have more than one export

export default function DataOne() {

    const [state,setState]= useState("Data coming from DataOne.js")

    const [data,setData]= useContext(DataContext)

    const addDataOne = () =>{
        setData([...data, state])
    }

    return (
        <div>
            <button onClick={addDataOne}>Click to add data from DataOne</button>

        </div>
    )
}
```

Donc, j'importe les hooks useState et useContext de React. Attention !=> dans DataProvider.js j'ai importé le hook "createContext", ici j'importe "useContext" car j'ai déjà créé mon contexte, maintenant je vais l'utiliser. Ensuite, je déclare l'état et lui donne une string de "Data coming from DataOne.js".

La partie importante ici est que je déclare un hook useContext de la même manière que le hook useState et que je lui passe le DataContext d'auprès du composant fournisseur. Notez que DataContext dans DataProvider.js était celui-ci :

```
export const DataContext= createContext([]);
```

Dans ce qui suit, je crée un bouton qui ajoutera l'état dans le tableau de contexte avec l'opérateur spread de Javascript. Désormais, chaque fois que je clique sur ce bouton, la string "Data coming from DataOne.js" sera ajoutée à mon contexte et sera disponible pour tous les composants auxquels le fournisseur a accès.

Maintenant, je fais la même chose pour DataTwo.js, sauf que je change les noms selon lui :

```
import React, {useState, useContext} from 'react'
import { DataContext } from './DataProvider'

// using curly brackets bcs we have more than one export

export default function DataTwo() {

    const [state,setState]= useState("Data coming from DataTwo.js")

    const [data,setData]= useContext(DataContext)

    const addDataTwo = () =>{
        setData([...data, state])
    }

    return (
        <div>
            <button onClick={addDataTwo}>Click to add data from DataTwo</button>

        </div>
    )
}
```

## Utilisation des données

Dans Display.js, j'écris le code suivant :

```
import React, {useState, useContext} from 'react'
import { DataContext } from './DataProvider'

export default function Display() {
    const [data,setData] = useContext(DataContext)


//here map is using regular brackets (), not curly brackets.
    const mappedData= data.map((item=>(
        <li>{item}</li>

    )))
    console.log(mappedData)


    return (
        <div>
            <ul>
     {mappedData}


            </ul>
        </div>
    )
}

```

J'importe {DataContext} entre les curly brackets d'auprès du fournisseur et les hooks {useState, useContext} de React comme je l'ai fait dans DataOne.js et DataTwo.js, je déclare le contexte avec le hook useContext, puis mappe simplement l'array dans une liste afin que chaque fois que je clique sur l'un des boutons, leurs composants respectifs enverront leur état à l'état global stocké dans DataProvider.js, et à son tour, le fournisseur fournira les données avec tous les composants que j'ai spécifiés. Par conséquent, à chaque clic, un élément string sera ajouté au array à afficher sur la page. Comme ça:

ENTER IMG HERE

## Conclusion

L'API de contexte est un moyen simple et sans tracas pour les développeurs qui souhaitent partager des données entre des composants sans utiliser une bibliothèque tierce comme Redux.

J'espère avoir pu aider quelqu'un.

Bon coding !
