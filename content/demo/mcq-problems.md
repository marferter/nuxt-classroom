# Démonstration du composant QCM pour divers types de questions

Répartir entre plusieurs pages ; enlever les exemples moins pertinents ; séparer une palette d'exemples variés en termes de contenu, et les démos des problèmes liés au yaml.


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
title: |
  Incohérence entre le title et les options dans un littéral block
uuid: bffab406-824b-43ea-b981-f0a020e37cf2
options:
  - option: |
      `3 + 4`
    is: false
    explanation: |
      `3 + 4` est une *expression arithmétique* qui évalue à 7.
---
Le retour à la ligne est pris en compte dans les options, pour autant qu'on saute deux lignes, mais pas dans le title.
::

::ActivityMcq
---
title: |
  Incohérence entre le title et les options dans un littéral block

  Retour à la ligne qui ne marche pas.
uuid: bffab406-824b-43ea-b981-f0a020e37cf2
options:
  - option: |
      `3 + 4`
    is: false
    explanation: |
      `3 + 4` est une *expression arithmétique* qui évalue à 7 :

      Retour à la ligne qui marche.
---
Le retour à la ligne est pris en compte dans les options, pour autant qu'on saute deux lignes, mais pas dans le title. Jusque là pas d'erreurs ni de warnings dans la console, pour autant qu'on ne mette pas de : dans le titre. Les : dans l'explication sont supportés.
::

<!--
::ActivityMcq
---
title: |
  Essai d'intégrer des blocks de code dans du yaml, dans la prop title.

  ```python
  from gturtle import *
  forward(100)
  ```
uuid: 12345678-1234-5678-1234-567812345678
options:
  - option: |
      Sans les guillemets.

      ```python
      from gturtle import *
      forward(100)
      ```
    is: true
    explanation: |
      "Avec les guillemets.
      
      ```python
      from gturtle import *
      forward(100)
      ```"
  - option: |
      Le problème vient vraiment du bloc préformaté.
    is: false
    explanation: |
      "Le problème vient vraiment du bloc préformaté."
---
Ici, on teste si un bloc de texte préformaté, tel qu'un bloc de code, peut être passé dans le yaml et ça ne marche ni dans title, ni dans option, ni dans explanation. Cela déclenche des warnings et des erreurs dans la console.
::
-->
