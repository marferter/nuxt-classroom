# Définir des fonctions (sans paramètre)
Dès le début de ce cours, vous utilisez des fonctions prédéfinies dans Python ou dans le module gturtle, 
par exemple :

*   ``sqrt(x)`` qui retourne la valeur de la racine de `x`,
*   ``forward(x)`` qui a pour effet de faire avancer la tortue de `x` pixels,
*   ``penUp()`` qui a pour effet de lever le crayon,
*   etc.

Pour faciliter l'écriture, la lecture et la modification du code, les langages de programmation offrent la possibilité aux utilisateurs 
de **définir de nouvelles fonctions personnalisées**, en combinant les fonctions prédéfinies et/ou d'autres fonctions personnalisées. 

Cela revient à donner un nom à un bout de code, pour pouvoir ensuite exécuter ce bout de code autant de fois qu'on veut en l'appelant 
simplement par son nom.

<!--
.. reveal:: fonctions-sans-parametres-remarque
    :showtitle: Pour information (contenu non évalué)

    Vous savez que le terme technique "fonction" n'a pas le même sens en maths qu'en informatique.

    L'analogie graphique vous aide à comprendre que dans la fonction ``forward(x)``,
    ``forward`` est le nom de la fonction, et $x$ entre parenthèses est une "valeur d'entrée"
    que l'on donne à la fonction.

    En informatique, toutes les fonctions sont définies et appelées avec les parenthèses. 
    Mais vous aurez remarqué que certaines fonctions ont une (ou plusieurs) "valeurs d'entrée" ou **paramètres**, comme par exemple ``sqrt(x)``
    ou ``forward(x)``, tandis que d'autres n'en ont pas, comme par exemple ``penUp()``.

    Nous allons commencer par apprendre à définir des fonctions sans paramètre ; 
    les fonctions avec paramètres suivront prochainement.

    Un autre constat intéressant est qu'en informatique, certaines fonctions produisent 
    une "valeur de sortie" et d'autres non. ``sqrt(120)`` produit une valeur que l'on peut réutiliser (par exemple : ``forward(sqrt(100))``); 
    tandis que les commandes ``forward(100)`` ou ``penUp()`` produisent des *effets*, mais pas une valeur ; 
    pour insister sur cette différence importante, les fonctions qui ne produisent pas de valeur
    sont techniquement appelées **procédures**.

    En première année, vous n'apprendrez à définir que des procédures.
::
-->

## Introduction

::ActivityShortAnswer
---
uuid: 5577e000-9286-4843-8a2a-2f60db848eea
title: Découverte des fonctions
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

A votre avis, que fait ce programme ? faites le dessin à la main, au brouillon.
::

::ActivityShortAnswer
---
uuid: 1c3e6f3c-2f3e-4dcb-8a7b-5e2f7f3e6c4b
title: Découverte des fonctions
---

Dans le programme ci-dessus, que se passerait-il si on supprimait la ligne 8 dans le code ?
::


::ActivityShortAnswer
---
uuid: 3f4e5d6c-7b8a-4c9d-0e1f-2a3b4c5d6e7f
title: Découverte des fonctions
---
Toujours dans le même programme :

```python
from gturtle import *

def triangle() :
    for _ in range(3) :
        forward(100)
        right(180 - 60)

triangle()
```
Que se passerait-il si on supprimait les lignes 3 à 6 ?
::


::ActivityShortAnswer
---
uuid: 4a5b6c7d-8e9f-0a1b-2c3d-4e5f6a7b8c9d
title: Découverte des fonctions
---
Toujours dans le même programme : que se passerait-il si on déplaçait le code de la ligne 8 avant la ligne 3 ?
::

::ActivityWtp
---
uuid: 4a5b6c7d-8e9f-0a1b-2c3d-4e5f6a7b8c9d
title: Découverte des fonctions
initialCode: |
    from gturtle import *

    def triangle() :
        for _ in range(3) :
            forward(100)
            right(180 - 60)

    triangle()
---
Vérifiez maintenant vos réponses à chacune des 4 questions ci-dessus en exécutant et en modifiant le code suivant ; souvenez-vous que vous pouvez revenir au code 
initial à l'aide du bouton.
::

## Définir vs appeler une fonction

Observons encore le programme :

<figure>
    <img src="/schema-definition-appel.png" alt="Schéma qui met en évidence les lignes où l'on définit la fonction et celles on l'on définit l'appel">
</figure>

Il est important de distinguer la **définition** de la fonction, aux lignes 3 à 7, 
de l'**appel** de la fonction, à la ligne 9. 

La *définition* ne fait rien d'autre que mettre en mémoire le nom de la fonction
et les instructions de son corps. Aucune instruction n'est exécutée.

Ce n'est qu'à l'*appel* de la fonction à la ligne 9 que les instructions des lignes 3 à 7 seront exécutées. 
Si l'appel manque, aucune de ces instructions ne sera exécutée !

### Remarque

Dans l'exemple ci-dessus, nous avons défini une **fonction sans paramètre** 
(i.e. qui ne prend pas de valeur d'entrée).

Vous vous doutez certainement qu'il serait encore plus intéressant de définir une fonction ``triangle(cote)``
à laquelle on pourrait passer la longueur du côté et qui nous permettrait de dessiner une variété infinie de triangles
équilatéraux, plutôt qu'un unique modèle de 100 pixels de côté.

Pour simplifier, nous avons choisi de nous concentrer d'abord sur la définition et l'utilisation 
de fonctions sans paramètre. Les **fonctions avec paramètres** nécessitent une meilleure 
compréhension des variables et feront l'objet d'un prochain chapitre.

## La syntaxe de la définition de fonctions

Examinez le schéma suivant qui met en évidence la **syntaxe** de la définition de la fonction :

<figure>
    <img src="/schema-syntaxe.png" alt="Schéma qui met en évidence les lignes où l'on définit la fonction et celles on l'on définit l'appel">
</figure>

Précisons encore qu'il y a des **règles à respecter dans le choix du nom de la fonction** :

* **Règles de syntaxe obligatoires**

    - Le nom de la fonction ne peut comporter que les caractères suivants :
        * des lettres (majuscules ou minuscules),
        * des chiffres (mais pas au début du nom),
        * le caractère de soulignement ``_``.
        
    - Le nom ne peut par exemple pas contenir d'espaces ni de tirets.
        
* **Bonnes pratiques**

    - Choisir un nom pertinent qui décrit bien ce que fait la fonction
    - Débuter le nom par une lettre minuscule ou un tiret bas ``_`` (*underscore* en anglais)
    - Ne pas utiliser de caractères accentués
    - Utiliser le caractère de soulignement pour distinguer différents mots au sein du nom. Si vous voulez combiner plusieurs mots pour former un nom, vous pouvez utiliser le soulignement. Vous pouvez ajouter un numéro, mais vous ne pouvez pas commencer par un numéro.

    Exemple : ``nom_avec_3_mots``

### Remarque

Les fonctions doivent impérativement avoir été définies avant leur appel. Python ne nous empêche pas d'intercaler des appels de fonctions et des définitions de fonctions, mais la meilleure pratique consiste à **écrire toutes les définitions de fonctions en tout début de programme**. C'est ce qui sera toujours implicitement attendu de vous.

## Questions de compréhension

::ActivityMcq
---
uuid: 9c8bd8f2-3f76-4343-9fc4-be60ecad207e
title: Questions de compréhension
options:
    -   option: |
            ```
            def ligne() : 
            ```
        is: true
    -   option : |
            ```
            def dessine 3 triangles():
            ```
        is: false
        explanation : "Erreur de syntaxe : espaces interdits dans le nom de la fonction."
    -   option : |
            ```                         
            def dessine_escalier():
            ```
        is: true
        explanation : Lorsqu'on veut utiliser un nom composé de plusieurs mots, la pratique recommandée en Pythonest d'utiliser le caractère de soulignement ``_`` pour séparer les mots.
    -   option : |
            ```     
            def 2traits():
            ```
        is: false
        explanation : "Erreur de syntaxe : un nom de fonction ne peut pas commencer par un chiffre."
---
Sélectionnez les options qui présentent des noms de fonctions corrects du point de vue de la syntaxe.
::

## Exercices

::ActivityWtp
---
uuid: 3ff8be8d-caed-4e3e-8f4e-3d26b5afcf89
title: Fonctions sans paramètres - carré
---

Écrivez un programme qui dessine un carré de côté 100 à l'aide d'une fonction ``dessine_carre()`` que vous définirez.

Définissez ensuite, dans le même programme, la fonction ``affiche_aire_carre()`` afin que votre programme calcule l'aire du carré et l'affiche dans la console.

#solution
Voici une solution possible ; vous remarquerez que le programme commence par une partie "définitions", suivie d'une partie "exécution" :

```python
    from gturtle import *

    #définitions des fonctions
    def dessine_carre() :
        for _ in range(4) :
            forward(100)
            right(90)

    def affiche_aire_carre() :
        aire = 100**2
        print("L'aire du carré est", aire, ".")

    #exécution
    dessine_carre()
    affiche_aire_carre()
```
::

::ActivityWtp
---
uuid: e6abe808-99d3-4cc8-9edc-54df7c986f63
title: "Fonctions sans paramètre : code rectangle() à corriger"
initialCode: |
    from gturtle import *

    def rectangle():
        for loop in range(2):
            forward(150)
            right(90)
            forward(50)
            right(90)
---
Jean-Guidon veut dessiner un rectangle à l'aide de la commande ``rectangle()``. Pourtant son programme ne dessine rien du tout ; corrigez son code.

#solution
Il a défini la fonction mais a oublié de l'appeler ; ajoutez l'appel de fonction ``rectangle()`` à la fin du programme !
:: 