# Démonstration du composant ActivityShortAnswer

Voici une démonstration du composant `ActivityShortAnswer` pour des questions ouvertes.

Le lien tout en haut de la page permet de voir le code source en Markdown, ainsi que l'entrée correspondante dans la base de données Content.

La donnée de la question est passée via un *slot* écrit en Markdown ; son format bénéficie donc de toute la souplesse du HTML. Ici la question contient un bloc de code avec coloration syntaxique.

La solution est passée via un *slot* nommé `solution`, avec la même souplesse de formatage. Comme elle est rédigée après la question, un éditeur tel que Visual Studio Code avec Copilot peut compléter ce *slot* automatiquement. 

C'est le cas pour tous les exemples que nous présentons dans cette page.

Pour voir la solution, cliquer sur le bouton "Soumettre".

::ActivityShortAnswer
---
title: "Définition vs appel de fonction"
uuid: 70b5f110-a9b0-4fb3-aeee-1824ae081dfe
---

Analysez le programme suivant :
```python
from gturtle import *

def triangle() :
    for _ in range(3) :
        forward(100)
        right(180 - 60)

triangle()
```

Que se passerait-il si on supprimait la ligne 8 ?

#solution
Sans la ligne 8 (`triangle()`), la fonction `triangle` serait bien définie, mais elle ne serait jamais appelée. Par conséquent, aucun triangle ne serait dessiné et le programme n'aurait aucun effet visible.

::
