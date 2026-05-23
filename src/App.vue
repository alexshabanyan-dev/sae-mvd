<template>
  <n-config-provider
    :theme-overrides="naiveThemeOverrides"
    :locale="naiveAppLocaleRu"
    :date-locale="dateRuRU"
  >
    <AppLayout>
      <RouterView />
    </AppLayout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { dateRuRU, NConfigProvider } from 'naive-ui'
import { RouterView } from 'vue-router'
import { naiveAppLocaleRu, naiveThemeOverrides } from '@mvd/ui-kit-custom'
import AppLayout from '@/app/layouts/AppLayout.vue'
</script>
