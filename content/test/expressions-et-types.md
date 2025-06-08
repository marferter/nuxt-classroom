# Test du composant Qcm en Markdown Components

::Mcq-sans-code
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


::Mcq
---
prompt:   "Que fait ce code :"
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
---
::


::Mcq
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