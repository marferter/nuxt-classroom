# Démonstration du composant Wtp

::ActivityWtp
---
title: "Suite de carrés décroissants"
uuid: 60ae2658-7981-4b93-a1d8-fbd1cd5ae06a
initialCode: |
    from gturtle import *

    def dessine_carre(cote) :
        for _ in range(4) :
            forward(cote)
            right(90)
---

1. A l’aide de la fonction `dessine_carre`, écrivez un programme qui dessine une suite de 5 carrés côte à côte , en partant d’un grand carré de côté 400 et en divisant chaque fois le côté par 2.

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

::ActivityWtp
---
title: "Suite de triangles décroissants"
uuid: 7d43bf8a-21bc-4121-a250-f7ba73d0308c
initialCode: |
    from gturtle import *
    
    def dessine_triangle(cote) :
        for _ in range(3) :
            forward(cote)
            right(120)
---

1. A l’aide de la fonction `dessine_triangle`, écrivez un programme qui dessine une suite de 5 triangles côte à côte , en partant d’un grand triangle de côté 400 et en divisant chaque fois le côté par 2.

2. Complétez le programme afin qu’il calcule la somme des aires de tous les triangles et qu’il affiche : “La somme des aires des triangles est …”.

::


Voici du code en dehors d'un composant :

```python
from gturtle import *
def dessine_carre(cote) :
    for _ in range(4) :
        forward(cote)
        right(90)

dessine_carre(400)
```  






