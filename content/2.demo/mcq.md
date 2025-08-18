# Démonstration du composant QCM pour divers types de questions

Répartir entre plusieurs pages ; enlever les exemples moins pertinents ; séparer une palette d'exemples variés en termes de contenu, et les démos des problèmes liés au yaml.


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
  Prompt simple et options avec code inline - syntaxe avec le *littéral block scalar*
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

::ActivityMcq
---
title: "Prompt avec bloc de code ; options, valeur et explications générées par Copilot"
uuid: 2b3c4d5e-6789-0123-4567-89abcdef0123
options:
  - option: "def ligne()"
    is: true
    explanation: "Il manque les deux-points à la fin de la définition de la fonction (`def ligne():`)."

  - option: "def dessine 3 triangles():"
    is: true
    explanation: "Le nom de la fonction ne doit pas contenir d'espaces ni commencer par un chiffre (`def dessine_3_triangles():`)."

  - option: "def dessine_escalier():"
    is: true
    explanation: "Le bloc d'instructions de la fonction n'est pas indenté correctement."

  - option: "def dessine_cercle():"
    is: false
    explanation: "La définition de cette fonction est correcte."

  - option: "def 2traits():"
    is: true
    explanation: "Le nom de la fonction ne doit pas commencer par un chiffre (`def deux_traits():`)."
---

Dans le programme ci-dessous, on définit différentes fonctions. Cochez les cases correspondant aux fonctions dont la définition contient des erreurs:

```python
from gturtle import *

def ligne()
    forward(100)

def dessine 3 triangles():
    for loop in range(3):
        for loop in range(3):
            forward(100)
            right(120)
        right(90)

def dessine_escalier():
for loop in range(5):
    forward(100)
    right(90)
    forward(120)
    left(90)

def dessine_cercle():
    for loop in range(36):
        forward(2)
        right(10)

def 2traits():
    forward(10)
    penUp()
    forward(10)
    penDown()
    forward(10)


dessine_cercle()
ligne()
dessine 3 triangles()
dessine_escalier()
2traits()
```
::

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
title: "2. Deklination"
uuid: 4d5e6f7a-8901-2345-6789-0abcdef12345
options:
  - option: "einen guten"
    is: true
    explanation: "‘einen’ est l’accusatif masculin singulier de ‘ein’, et ‘guten’ est la forme correcte de l’adjectif ‘gut’ après l’article indéfini à l’accusatif masculin."
  - option: "ein guter"
    is: false
    explanation: "‘ein guter’ est nominatif masculin, mais ici il faut l’accusatif."
  - option: "eine gute"
    is: false
    explanation: "‘eine gute’ est féminin, alors que ‘Freund’ est masculin."
  - option: "einem guten"
    is: false
    explanation: "‘einem guten’ est datif masculin, mais ici il faut l’accusatif."
  - option: "eines guten"
    is: false
    explanation: "‘eines guten’ est génitif masculin, mais ici il faut l’accusatif."
---
Wähle die richtige Kombination aus Artikel + Adjektiv aus :

**Ich habe _ _ Freund.**
::

::ActivityMcq
---
title: Exemples de questions à choix multiples avec code
#question: Déterminez quelles variable sont correctement déclarées (5 options en python, avec valeur et explication)
uuid: 6f7a8b9c-0123-4567-8901-abcdef123456
options :
  - option: "`x = 5`"
    is: true
    explanation: "C'est une déclaration correcte d'une variable entière en Python."
  - option: "`y = 'Hello'`"
    is: true
    explanation: "C'est une déclaration correcte d'une variable de type chaîne de caractères en Python."
  - option: "`z = [1, 2, 3]`"
    is: true
    explanation: "C'est une déclaration correcte d'une liste en Python."
  - option: "`a = {1, 2, 3}`"
    is: false
    explanation: "Ceci est une déclaration correcte d'un ensemble (set) en Python, mais la question demande des variables avec des valeurs spécifiques."
  - option: "`b = (1, 2)`"
    is: false
    explanation: "Ceci est une déclaration correcte d'un tuple en Python, mais la question demande des variables avec des valeurs spécifiques."
---
Cochez les variables qui sont correctement déclarées en Python :

::

::ActivityMcq
---
#Question : quel est le code gturtle qui a produit ce dessin (spirale hexagone à 8 côtés) ; les options sont simplement "Option 1" à "Option 4" ; les 4 options de code sont dans le promtp, dont 2 sont correctes
title: Exemples de questions à choix multiples avec code et options
uuid: d131d1ae-430b-4143-b633-e8586ebbd8b1
options :
  - option: "Option 1"
    code: |
      ```python
      from gturtle import *
      for i in range(8):
          forward(100)
          right(45)
      ```
    is: true
    explanation: "Ce code dessine une spirale hexagonale à 8 côtés."

  - option: "Option 2"
    code: |
      ```python
      from gturtle import *
      for i in range(6):
          forward(100)
          right(60)
      ```
    is: false
    explanation: "Ce code dessine un hexagone, pas une spirale à 8 côtés."

  - option: "Option 3"
    code: |
      ```python
      from gturtle import *
      for i in range(4):
          forward(100)
          right(90)
      ```
    is: false
    explanation: "Ce code dessine un carré, pas une spirale à 8 côtés."

  - option: "Option 4"
    code: |
      ```python
      from gturtle import *
      for i in range(12):
          forward(50)
          right(30)
      ```
    is: false
    explanation: "Ce code dessine une spirale à 12 côtés, pas une spirale à 8 côtés."
---
Parmi les 4 codes suivants, lequel produit une spirale hexagonale à 8 côtés ?

### Option 1
```python
from gturtle import *
for i in range(8):
    forward(100)
    right(45)
```
### Option 2
```python
from gturtle import *
for i in range(6):
    forward(100)
    right(60)
```
### Option 3
```python
from gturtle import *
for i in range(4):
    forward(100)
    right(90)
```
### Option 4
```python
from gturtle import *
for i in range(12):
    forward(50)
    right(30)
```
::
