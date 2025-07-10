# Démonstration du composant Wtp

::ActivityWtp
---
title: "Exercice"
uuid: 60ae2658-7981-4b93-a1d7-ebd1cd5ae06a
initialCode: |
    def dessine_carre(cote) :
        for _ in range(4) :
            forward(cote)
            right(90)
---

1. A l’aide de la fonction dessine_carre, écrivez un programme qui dessine une suite de 5 carrés côte à côte , en partant d’un grand carré de côté 400 et en divisant chaque fois le côté par 2.

2. Complétez le programme afin qu’il calcule la somme des aires de tous les carrés et qu’il affiche : “La somme des aires des carrés est …”.

  <figure>
    <img src="/suite-carres.png" alt="Suite de carrés">
    <figcaption>Suite de carrés</figcaption>
  </figure>

#solution

Voici une solution possible :

```python
from gturtle import *

def dessine_carre(cote) :
    for _ in range(4) :
        forward(cote)
        right(90)

#initialiser la variable
cote_carre = 400

for _ in range(5) :
    dessine_carre(cote_carre)
    #positionner la tortue au point de départ du carré suivant
    right(90)
    forward(cote_carre)
    left(90)
    #incrémenter la variable
    cote_carre /= 2
```
::

<!--
Voici du code en dehors d'un composant :

```python
from gturtle import *
def dessine_carre(cote) :
    for _ in range(4) :
        forward(cote)
        right(90)

dessine_carre(400)
````
-->




