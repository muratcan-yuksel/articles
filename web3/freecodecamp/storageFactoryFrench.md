# Créer ub <<storage factory>> smart contract en Solidity et interagir avec lui (notes de Freecodecamp)

Je suis le merveilleux cours web3 de Freecodecamp sur Youtube (lien ici => https://www.youtube.com/watch?v=gyMwXuJrbJQ&ab_channel=freeCodeCamp.org), et pour m'assurer de me souvenir de ce que j'ai appris, j'aime prendre des notes. Ici, je posterai mes notes de la leçon 3 : Remix Storage Factory. Je vais rendre mes notes désorganisées lisibles par l'homme afin qu'elles ressemblent à un tutoriel.

Veuillez noter que tout le crédit revient à Patrick Collins et à l'incroyable équipe/communauté de Freecodecamp, je ne fais que livrer ce que j'ai vu sous forme écrite afin de ne pas avoir à revoir le video tutoriel à l'avenir. J'espère que vous aussi pourrez en profiter.

Comme il s'agit de la 3ème leçon, il manque quelques fondamentaux ici. Il reprend également le smart contrat SimpleStorage qui nous a été présenté dans la leçon 2 du cours Freecodecamp. Vous voudrez peut-être le vérifier avant de lire cet article, même si j'essaierai d'expliquer ce qui se passe dans le contrat SimpleStorage. Si je me trompe à un moment donné, n'hésitez pas à corriger car cela fait plus q'une semaine depuis je'ai regardé la leçon 2, j'ai donc peut-être oublié certaines des raisons pour lesquelles nous faisons les choses comme nous le faisons : )

Nous utiliserons Remix IDE pour ce post, alors assurez-vous d'aller sur https://remix.ethereum.org/ et soyez prêt pour le hacking !

Remarque : Vous pouvez trouver le code de tous les contrats ici dans le repo GitHub de Patrick, ici => https://github.com/PatrickAlphaC/storage-factory-fcc

## Simple storage smart contract

Commençons par examiner le smart contrat SimpleStorage .

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract SimpleStorage {

    uint256 favoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }
    // uint256[] public anArray;
    //create an array of type People, which is a struct and name it people. It is also public.
    People[] public people;

    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256){
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
```

Tous les smart contrats Solidity commencent par un identifiant de licence SPDX. Il s'agit d'une licence sous laquelle se trouve le smart contract. Dans ce cas, c'est le MIT. Si je ne me trompe pas, cela signifie que c'est open source.

Ensuite, nous devons définir la version du compilateur Solidity. ^ 0.8.0 signifie "tout ce qui est au-dessus de 0.8.0" passe.

Ensuite, nous utilisons le mot-clé contract pour faire savoir au compilateur que nous créons un smart contract. Notre contrat s'appelle SimpleStorage.

Puisque Solidity est un langage typé, nous devons définir le type de la variable que nous créons. Je suis normalement un développeur Javascript, donc mon esprit fonctionne en termes de JS. Voici comment je le vois : au lieu de dire `let favouriteNumber` ou `const favouriteNumber`, nous disons `uint256 favouriteNumber`. Si nous devions définir un string, nous devrions dire `string favoriteNumber`.

Maintenant que nous avons notre variable favoriteNumber prête, nous créons un `struct` de People. Les structs sont comme des objets en Javascript. Ils prennent des paires clé/valeur. Dans ce cas, il s'agit de `uint256 favoriteNumber` et d'un `string name`.

Ensuite, nous créons un array dynamique nommé people avec le type People struct. Je ne connais pas encore Typescript ou tout autre langage typé autre que Solidity, donc cette partie était (et est toujours) assez déroutante pour moi. C'est comme si ce array de people ne pouvait prendre que des structs People comme valeurs. Il ne peut pas prendre une seule string ou un array de strings ou d'uints ou quoi que ce soit d'autre que des structs People. Il ne peut pas prendre d'autres types de structs également si je ne me trompe pas; il ne peut prendre que des structs People comme valeurs et c'est tout.

De plus, avec cette syntaxe People[] public people, nous disons au compilateur qu'il s'agit d'un array dynamique de structs People. C'est-à-dire que la longueur d'array n'est pas défini, car vous pouvez le faire dans Solidity, c'est-à-dire que vous pouvez avoir des arrays avec une longueur prédéfinie.

En plus sur l'array, vous remarquerez le mot-clé public ici. Cela signifie que cette variable est publique, c'est-à-dire qu'elle peut être vue et appelée en dehors du contrat. Si nous disions `private` au lieu de cela, vous ne pourriez pas y accéder depuis l'extérieur du contrat.

Ensuite, nous avons un mapping de type string à uint256. Les mappings aussi m'ont beaucoup déconcerté dans Solidity. Ils sont comme des objets dans JS, mais au lieu de prendre plusieurs valeurs comme des structs, ils ne prennent qu'une seule paire clé/valeur et ils fonctionnent comme des arrays en Javascript. Ils sont cependant très pratiques, en particulier en travaillant avec les addresses.

Notre première fonction, store est une fonction publique qui prend un seul paramètre _favoriteNumber de type uint256 et change la variable favoriteNumber à la valeur du paramètre \_favoriteNumber. Le trait de soulignement (_) n'est qu'une convention dans Solidity, c'est pour les paramètres.

Ensuite, nous avons une fonction "retrieve" qui est publique et visible. Cela signifie qu'il peut être vu et appelé depuis l'extérieur du contrat. Il renvoie une valeur "uint256" et ne coûte PAS d'essence. C'est parce que cela ne change pas l'état de l'EVM (Ethereum Virtual Machine). Puisqu'il n'y a pas de changement, il n'y a pas de frais d'essence.

Ensuite, nous avons une fonction `addPerson` qui est publique. Il prend deux paramètres `_name` et `_favoriteNumber` de type `string` et `uint256`. Maintenant, la première ligne à l'intérieur de cette fonction, ` people.push(People(_favoriteNumber, _name));`, fait ce qui suit : elle prend les paramètres et crée une struct People avec eux et pousse cette nouvelle struct People dans l'array people.

La deuxième ligne, ` nameToFavoriteNumber[_name] = _favoriteNumber;`, fait ce qui suit : elle prend les paramètres et crée une paire clé/valeur avec eux et place cette nouvelle paire clé/valeur dans le mapping nameToFavoriteNumber. Vous voyez, dans le mapping ` mapping(string => uint256) public nameToFavoriteNumber;` nous avons une string et uint256, donc le `_name` va comme string, et `_favoriteNumber` va comme uint256.

C'est tout pour le contrat SimpleStorage.sol. Vous pouvez coller ce contrat pour le remixer, le déployer et jouer avec. Vous remarquerez que jusqu'à présent, nous ne pouvons récupérer que le favoriteNumber car nous n'avons créé qu'une fonction `getter` pour cela.
