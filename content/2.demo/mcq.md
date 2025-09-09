# Démonstration du composant QCM pour divers types de questions

Voici une démonstration du composant `ActivityMcq` pour des questions ouvertes.

Le lien tout en haut de la page permet de voir le code source en Markdown, ainsi que l'entrée correspondante dans la base de données Content.

La donnée de la question est passée via un *slot* écrit en Markdown ; son format bénéficie donc de toute la souplesse du HTML. Diverses variantes sont présentées ici : prompt simple, prompt avec bloc de code, prompt avec figures, etc.

Les options de réponse sont passées en prop (YAML dans le "frontmatter" - voir dans le code source en Markdown). Les explications de chaque option font partie de la prop.

La solution est passée via un *slot* nommé `solution`, avec la même souplesse de formatage. Comme elle est rédigée après la question, un éditeur tel que Visual Studio Code avec Copilot peut compléter ce *slot* automatiquement. 

Pour voir la solution, cliquer sur le bouton "Soumettre".

## Prompts simples : comparez la syntaxe avec et sans le "littéral block scalar"

::ActivityMcq
---
title : Prompt simple et options avec code inline
uuid: a1eed46d-adab-463f-ae07-437c66efe1bc
options:
  - option: "`3 + 4`" 
    is: false
    explanation: "`3 + 4` est une *expression arithmétique* qui évalue à 7."
  - option: "`\"Hello, world!\"`"
    is: true
    explanation: "`\"Hello, world!\"` est une valeur littérale de type `str`."
  - option: "`sqrt(100)`"
    explanation: "`sqrt(100)` est une *expression* (appel de fonction) qui évalue à 10."
  - option: "`True`"
    is: true
    explanation: "`True` est une valeur littérale de type `bool`."
  - option: "`2 * (3 + 5)`"
    explanation: "`2 * (3 + 5)` est une *expression arithmétique* qui évalue à 16."
  - option: "`19 >= 18`"
    explanation: "`19 >= 18` est une *expression booléenne* qui évalue à `True`."
---

Cochez toutes les valeurs littérales parmi les options suivantes :
::


::ActivityMcq
---
title : |
  Prompt simple et options avec code inline - syntaxe avec le "littéral block scalar"
uuid: f7ca7f81-e1c1-4b0c-916b-6a1809237a6f
options:
  - option: |
      `3 + 4`
    is: false
    explanation: |
      `3 + 4` est une *expression arithmétique* qui évalue à 7.
  - option: |
      `"Hello, world!"`
    is: true
    explanation: |
      `\"Hello, world!\"` est une valeur littérale de type `str`.
  - option: |
      `sqrt(100)`
    explanation: |
      `sqrt(100)` est une *expression (appel de fonction)* qui évalue à 10.
  - option: |
      `True`
    is: true
    explanation: |
      `True` est une valeur littérale de type `bool`.
  - option: |
      `2 * (3 + 5)`
    explanation: |
      `2 * (3 + 5)` est une *expression arithmétique* qui évalue à 16.
  - option: |
      `19 >= 18`
    explanation: |
      `19 >= 18` est une *expression booléenne* qui évalue à `True`.
---

Cochez toutes les valeurs littérales parmi les options suivantes :
::

## Questions avec images

Deux versions de la même question, d'abord avec les images dans le prompt, puis avec les images dans les options.

::ActivityMcq
---

title: "Prompt complexe : Markdown, html"
uuid: 3c4d5e6f-7890-1234-5678-90abcdef1234
options:
  - option : Option 1
  - option : Opions 2
  - option : Option 3
    is: true
  - option : Option 4


---
Voici un programme :
```python
from gturtle import *

def ligne(longueur) :
    penDown()
    forward(longueur)
    back(longueur)

def motif(longueur_min, longueur_max) :
    longueur = longueur_min
    while longueur <= longueur_max :
        ligne(longueur)
        longueur += 10

        penUp()
        right(90)
        forward(20)
        left(90)
longueur_init = 20
motif(longueur_init, 55)
print(longueur)
```
Laquelle des images suivantes son exécution produit-elle ?

<div style="display: flex; gap: 1rem;">
  <figure>
    <img src="/barres1.png" alt="spirale">
    <figcaption>Option 1</figcaption>
  </figure>

  <figure>
    <img src="/barres2.png" alt="hélice">
    <figcaption>Option 2</figcaption>
  </figure>

  <figure>
    <img src="/barres3.png" alt="4 barres">
    <figcaption>Option 3</figcaption>
  </figure>

  <figure>
    <img src="/barres4.png" alt="5 barres">
    <figcaption>Option 4</figcaption>
  </figure>

</div>
::

::ActivityMcq
---

title: "Prompt complexe : Markdown, html"
uuid: 3c4d5e6f-7890-1234-5678-90abcdef1234
options:
  - option : |
        <figure>
          <img src="/barres1.png" alt="spirale">
          <figcaption>Option 1</figcaption>
        </figure>
  - option : |
      <figure>
        <img src="/barres2.png" alt="hélice">
        <figcaption>Option 2</figcaption>
      </figure>
  - option : |
      <figure>
        <img src="/barres3.png" alt="4 barres">
        <figcaption>Option 3</figcaption>
      </figure>
  - option : |
      <figure>
        <img src="/barres4.png" alt="5 barres">
        <figcaption>Option 4</figcaption>
      </figure>


---
Voici un programme :
```python
from gturtle import *

def ligne(longueur) :
    penDown()
    forward(longueur)
    back(longueur)

def motif(longueur_min, longueur_max) :
    longueur = longueur_min
    while longueur <= longueur_max :
        ligne(longueur)
        longueur += 10

        penUp()
        right(90)
        forward(20)
        left(90)
longueur_init = 20
motif(longueur_init, 55)
print(longueur)
```
Laquelle des images suivantes son exécution produit-elle ?
::

## Question avec blocs de code

Deux versions de la même question, d'abord avec les blocs de code dans le prompt, puis avec les blocs de code dans les options.

::ActivityMcq
---
#Question : quel est le code gturtle qui a produit ce dessin (spirale hexagone à 8 côtés) ; les options sont simplement "Option 1" à "Option 4" ; les 4 options de code sont dans le promtp, dont 2 sont correctes
title: Exemples de questions à choix multiples avec code et options
uuid: d131d1ae-430b-4143-b633-e8586ebbd8b1
options :
  - option: "Option 1"
    is: true
    explanation: "Ce code dessine une spirale hexagonale à 8 côtés."

  - option: "Option 2"
    is: false
    explanation: "Ce code dessine un hexagone, pas une spirale à 8 côtés."

  - option: "Option 3"
    is: false
    explanation: "Ce code dessine un carré, pas une spirale à 8 côtés."

  - option: "Option 4"
    is: false
    explanation: "Ce code dessine une spirale à 12 côtés, pas une spirale à 8 côtés."
---
Parmi les 4 codes suivants, lequel produit une spirale hexagonale à 8 côtés ?

**Option 1**    
```python
from gturtle import *
for i in range(8):
    forward(100)
    right(45)
```
**Option 2**
```python
from gturtle import *
for i in range(6):
    forward(100)
    right(60)
```
**Option 3**
```python
from gturtle import *
for i in range(4):
    forward(100)
    right(90)
```
**Option 4**
```python
from gturtle import *
for i in range(12):
    forward(50)
    right(30)
```
::

::ActivityMcq
---
#Question : quel est le code gturtle qui a produit ce dessin (spirale hexagone à 8 côtés) ; les options sont simplement "Option 1" à "Option 4" ; les 4 options de code sont dans le promtp, dont 2 sont correctes
title: Exemples de questions à choix multiples avec code et options
uuid: d131d1ae-430b-4143-b633-e8586ebbd8b1
options :
  - option: |
      <code>
        <pre>
          from gturtle import *
          for i in range(8):
              forward(100)
              right(45)
        </pre>
      </code>
    is: true
    explanation: "Ce code dessine une spirale hexagonale à 8 côtés."

  - option: |
      <code>
        <pre>
          from gturtle import *
          for i in range(6):
              forward(100)
              right(60)
        </pre>
      </code> 
    is: false
    explanation: "Ce code dessine un hexagone, pas une spirale à 8 côtés."

  - option: |
      <code>
        <pre>
          from gturtle import *
          for i in range(4):
              forward(100)
              right(90)
        </pre>
      </code>
    is: false
    explanation: "Ce code dessine un carré, pas une spirale à 8 côtés."

  - option: |
      <code>
        <pre>
          from gturtle import *
          for i in range(12):
              forward(50)
              right(30)
        </pre>
      </code>
    is: false
    explanation: "Ce code dessine une spirale à 12 côtés, pas une spirale à 8 côtés."
---
Parmi les 4 codes suivants, lequel produit une spirale hexagonale à 8 côtés ?
::
