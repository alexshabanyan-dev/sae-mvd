<template>
  <n-grid :cols="3" :x-gap="24" :y-gap="24" responsive="screen">
    <n-gi :span="1">
      <TypographyExample />
    </n-gi>
    <n-gi :span="2">
      <n-flex vertical :size="24">
        <SwitchExample />
        <InputsExample />
      </n-flex>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { NFlex, NGi, NGrid } from 'naive-ui'

import InputsExample from '@/naive/example/inputs-example/InputsExample.vue'
import SwitchExample from '@/naive/example/SwitchExample.vue'
import TypographyExample from '@/naive/example/typography-example/TypographyExample.vue'
</script>
