
# Test de divers composants et divers formats d'entrée des questions

::ActivityMcqV1
---
title: "Composant Mcq avec slot-prompt et prop-options"
#Que fait ce code:
#  ```python
#  from gturtle import *

#  for i in range(4):
#   forward(100)
#    right(90)
options:
  - option: "Un carré est dessiné à l'écran."
    is: true
    explanation: |
      La boucle `for` exécute 4 fois les instructions `forward(100)` et `right(90)`, ce qui fait avancer la tortue de 100 unités puis tourner de 90 degrés à droite, traçant ainsi un carré.
  - option: "Un triangle est dessiné à l'écran."
    explanation: |
      Un triangle nécessiterait 3 côtés et des angles de 120 degrés, pas 4 côtés et des angles de 90 degrés.
  - option: "Un cercle est dessiné à l'écran."
    explanation: |
      Un cercle nécessiterait de petites rotations répétées, pas seulement 4 rotations de 90 degrés.
  - option: "Le code ne dessine rien."
    explanation: |
      Le code dessine bien une forme, il ne reste pas inactif.
---
Que fait ce code :
```python
from gturtle import *

for i in range(4):
  forward(100)
  right(90)
```
::


::ActivityMcq-sans-code
---

prompt:   "Que fait ce code :
  ```python
  from gturtle import *

  for i in range(4):
    forward(100)
    right(90)
  ```
  "
  
options:
  - option: "*Paris*"
    is: true
  - option: "**Lyon**"
    explanation: |
      Lyon est une grande ville française, mais ce n’est pas la capitale.
---
::


::ActivityMcq_full_props
---
title: "Exemples de questions à choix multiples sans code"
prompt:   "Que fait ce code-ci :"
code: |
  from gturtle import *

  for i in range(4):
    forward(100)
    right(90)

  
options:
  - option: "*Paris*"
    is: true
  - option: "**Lyon**"
    explanation: |
      Lyon est une grande ville française, mais ce n’est pas la capitale.

custom: un truc
code1: |
  ```python
  for _ in range(4) :
    forward(100)
  ```
---

Et {{code1}} en plus.

```python
for _ in range(4) :
  forward(100)
```
::


::ActivityMcq_full_props
---

prompt: "Cochez toutes les valeurs littérales parmi les options suivantes :"
options:
  - option: "`3 + 4`"
    explanation: "`3 + 4` est une *expression arithmétique* qui évalue à 7."
  - option: "`\"Hello, world!\"`"
    is: true
    explanation: "`\"Hello, world!\"` est une valeur littérale de type `str`."
  - option: "`sqrt(100)`"
    explanation: "`sqrt(100)` est une *expression (appel de fonction)* qui évalue à 10."
  - option: "`True`"
    is: true
    explanation: "`True` est une valeur littérale de type `bool`."
  - option: "`2 * (3 + 5)`"
    explanation: "`2 * (3 + 5)` est une *expression arithmétique* qui évalue à 16."
  - option: "`19 >= 18`"
    explanation: "`19 >= 18` est une *expression booléenne* qui évalue à `True`."
---
::