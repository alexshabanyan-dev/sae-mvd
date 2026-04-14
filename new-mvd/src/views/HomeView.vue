<template>
  <n-grid
    :cols="3"
    :x-gap="24"
    :y-gap="24"
    responsive="screen"
    :item-style="gridItemStyle"
  >
    <n-gi :span="1">
      <TypographyExample :style="blockStretchStyle" />
    </n-gi>
    <n-gi :span="2">
      <SwitchExample :style="blockStretchStyle" />
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

import { NGi, NGrid } from 'naive-ui'

import SwitchExample from '@/naive/example/SwitchExample.vue'
import TypographyExample from '@/naive/example/typography-example/TypographyExample.vue'

/** Ячейка сетки как колонка — дочерний блок может растянуться по высоте строки. */
const gridItemStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
}

/** Прокидывается на корневой `n-card` примеров (один корень у SFC). */
const blockStretchStyle: CSSProperties = {
  flex: '1 1 0',
  minHeight: 0,
  minWidth: 0,
  width: '100%',
}
</script>
