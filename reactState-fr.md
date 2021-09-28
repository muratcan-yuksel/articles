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
