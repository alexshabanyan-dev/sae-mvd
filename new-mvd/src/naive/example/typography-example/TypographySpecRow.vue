<template>
  <n-flex :wrap="false" align="center" :size="16">
    <div class="typography-spec-row__sample">
      <slot />
    </div>
    <div class="typography-spec-row__meta">
      <slot name="meta" />
    </div>
  </n-flex>
</template>

<script setup lang="ts">
import { NFlex } from 'naive-ui'
</script>

<style scoped>
.typography-spec-row__sample {
  flex: 0 1 auto;
  min-width: 143px;
  color: inherit;
}

.typography-spec-row__meta {
  box-sizing: border-box;
  width: 97px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.3px;
  color: inherit;
}
</style>
