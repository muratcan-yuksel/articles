Suppose qu'on souhaite transmettre des données entre les composants React. Comme je l'ai vu, il y a plusieurs façons de le faire. Ce que je vais montrer ici n'est que l'un d'entre eux. Il n'utilise rien d'externe, c'est donc un bon moyen (à mon avis) de pratiquer ses compétences en React. Dans mon cas, j'avais besoin de transmettre les inputs d'utilisateur d'un composant à un autre. Pour ce faire, j'ai utilisé un troisième composant (parent). Je vais essayer de vous montrer à quel point il est facile de le faire.

## Passer des données du composant parent au l'enfant

Commençons par l'étape la plus simple : envoyer des données du parent à l'enfant. Pour faciliter des choses, j'utiliserai un function component pour l'enfant. Disons que nous avons un parent component App. ON va utilise les class components ici.

```
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { data: "some data here" };
  }

  render() {
    return (
      <div>
        <Child1 parentData={this.state.data} />
      </div>
    );
  }
}
```

Comme on peut le voir, j'ai déjà inclus un composant Child1 dans la méthode render, avec les props "parentData" qui utilisent l'objet "data" dans l'état du composant App.

Étape 2 : On déclare un function component Child1 et transmettez-y les props parentData.

```
function Child1(props) {
  return <div>The data we're getting is : {props.parentData}</div>;
}
```

C'est tout, en fait. Ici, l'on envoie les données du parent à l'enfant, et de l'enfant, on peut l'utiliser dans la méthode render. Je ne sais pas si quelqu'un se sent bizarre comment ces choses fonctionnent dans React, parce que je l'ai senti comme ça, mais une fois que l'on a compris, il est très confortable de jouer avec React.

## Du composant enfant au parent (et de là à un autre enfant)

Voyons maintenant comment nous pouvons transmettre des données de l'enfant au parent. Parce que le composant parent sera le moyen par où nous transmettrons les données entre les enfants. Réécrivons notre composant de classe App:

```
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { data: "some data here" };
  }
  handleCallback = (childData) => {
    this.setState({ data: childData });
  };
  render() {
    return (
      <div>
        <Child1 parentData={this.state.data} />
        <Child2 fromChild={this.handleCallback} />

      </div>
    );
  }
}
```

Nous avons fait de nouvelles choses avec le composant de classe App. On a ajouté d'une fonction handleCallback qui définit l'état avec les données prises par les props "fromChild". - On a rendu un composant Child2 avec les props fromChild qui appele la fonction handleCallback.

Maintenant, nous devons écrire le composant Child2. Pour faciliter les choses encore une fois, je vais écrire celui-ci en tant que composant de classe. Cela nous montre que les enfants n'ont pas besoin d'être du même type de composants, en effet, l'un peut être un composant de classe et l'autre peut être un composant de fonction. Juste pour que nous le sachions.

Voici notre composant Child2 :

```
class Child2 extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  sendData = () => {
    this.props.fromChild("data sent by the child");
  };

  render() {
    return (
      <div>
        <button onClick={this.sendData}>Send data</button>
      </div>
    );
  }
}
```

Qu'avons-nous ici ? -Une fonction sendData avec les props fromChild -un bouton qui appelle cette fonction sendData au clic. Ce qui va se passer maintenant? Eh bien, rappelez-vous que nous avons mis les props fromChild dans le composant Child2 tout en le rendrent dans le composant parent App. Les props fromChild, à leur tour, appelaient la fonction handleCallback qui met à jour l'état du composant App. Et rappelez-vous, que faisait notre premier composant enfant ? Exactement, il obtenait des données de l'état du composant App. Maintenant, à la suite des étapes ci-dessus, le premier composant enfant obtiendra les données fournies par le deuxième composant enfant, en utilisant le parent comme un moyen.

Si vous écrivez ces lignes de code, vous verrez un bouton, et lorsque vous cliquez sur le bouton, le texte (c'est-à-dire les données) changera.

J'espère que cette explication était claire. J'ai réalisé, en écrivant, à quel point React fonctionnait bizarrement. Mais encore une fois, une fois que vous l'avez comprendre, les choses commencent à devenir assez automatiques.

Alors, amusez-vous et continuez à coder!
