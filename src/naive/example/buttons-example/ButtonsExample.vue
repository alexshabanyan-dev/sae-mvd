<template>
  <n-card size="small" bordered aria-label="Кнопки">
    <n-flex vertical :size="24">
      <BigButtonsExample />
      <StandardButtonsExamples />
      <SmallButtonsExample />
    </n-flex>
  </n-card>
</template>

<script setup lang="ts">
import { NFlex } from 'naive-ui'

import BigButtonsExample from './BigButtonsExample.vue'
import StandardButtonsExamples from './StandardButtonsExamples.vue'
import SmallButtonsExample from './SmallButtonsExample.vue'
</script>
