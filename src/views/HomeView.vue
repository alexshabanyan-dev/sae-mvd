<template>
  <n-flex vertical :size="24" style="width: 100%">
    <n-grid :cols="24" :x-gap="24" :y-gap="16">
      <n-gi :span="5">
        <DrawerExample />
      </n-gi>

      <n-gi :span="5">
        <BreadcrumbsExample />
      </n-gi>
    </n-grid>
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
    <ButtonsExample />
  </n-flex>
</template>

<script setup lang="ts">
import { NFlex, NGi, NGrid } from 'naive-ui'

import ButtonsExample from '@/naive/example/buttons-example/ButtonsExample.vue'
import DrawerExample from '@/naive/example/DrawerExample.vue'
import InputsExample from '@/naive/example/inputs-example/InputsExample.vue'
import SwitchExample from '@/naive/example/SwitchExample.vue'
import TypographyExample from '@/naive/example/typography-example/TypographyExample.vue'
import BreadcrumbsExample from '@/naive/example/BreadcrumbsExample.vue'
</script>
