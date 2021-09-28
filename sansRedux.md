# Comment passer des données entre les composants React ?

Dans mon dernier projet, j'ai dû partager l'état entre de nombreux composants. La plupart d'entre eux ne partageaient pas un parent commun, donc passer un état avec des props et une callback fonction n'était pas une option, il serait gênant de le faire aussi. Par conséquent, j'ai utilisé l'API de contexte de React pour créer un état global et le partager entre tous les composants que je souhaitais. Dans ce tutoriel, je vais montrer comment y parvenir.

Avant de commencer, je dois remercier Dev Ed pour ce tutoriel éclairant. J'ai acquis et utilisé beaucoup de connaissances grâce à cette vidéo. Les développeurs qui préfèrent regarder des vidéos peuvent arrêter de lire et cliquer sur le lien suivant youtube.com/watch?v=35lXWvCuM8o&t=1790s c'est le même concept avec des exemples légèrement différents.

Notez que l'exemple que je vais donner ici est assez basique et que l'API React Context est suggérée pour être utilisée pour des instances plus complexes.
