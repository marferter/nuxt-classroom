::ActivityMcqV1
---
title : Prompt simple et options avec code inline
uuid: a1eed46d-adab-463f-ae07-437c66efe1bc
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


Cochez toutes les valeurs littérales parmi les options suivantes :
::