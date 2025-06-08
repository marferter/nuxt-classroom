<template>
  <div>
    <h2>Test du composant Qcm</h2>
    <Awrapper>
        <Mcq :options="options" :prompt="prompt" />
    </Awrapper>
  </div>
</template>

<script setup lang="ts">
import Mcq from '~/components/Mcq-sans-code.vue'

type McqOption = {
  option: string
  is: boolean
  explanation: string
}

const options: McqOption[] = [
  {
    option: "Paris",
    is: true,
    explanation: "Paris est la capitale de la France."
  },
  {
    option: "Lyon",
    is: false,
    explanation: "Lyon est une grande ville française, mais ce n’est pas la capitale."
  }
]
const prompt = `
Voici du code :

\`\`\`python
print('Hello')
print('World')
\`\`\`
`
</script>