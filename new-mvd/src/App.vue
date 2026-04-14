<template>
  <n-config-provider :theme-overrides="naiveThemeOverrides" :locale="ruRU" :date-locale="dateRuRU">
    <AppLayout>
      <RouterView />
    </AppLayout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { dateRuRU, NConfigProvider, ruRU } from 'naive-ui'
import { RouterView } from 'vue-router'
import { naiveThemeOverrides } from '@/naive'
import AppLayout from '@/app/layouts/AppLayout.vue'
</script>
