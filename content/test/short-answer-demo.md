# Démonstration du composant ActivityShortAnswer

::ActivityShortAnswer
---
title: "Prompt avec bloc de code ; solution générée par Copilot"
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
