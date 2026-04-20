<template>
  <n-card size="small" bordered title="Раздел">
    <n-flex vertical :size="12">
      <span>
        Дочерняя страница относительно главной: маршрут
        <code>/section</code>
        .
      </span>
      <router-link v-slot="{ navigate }" :to="{ name: 'home.section.inner' }" custom>
        <n-button @click="navigate"> Вложенная страница </n-button>
      </router-link>
    </n-flex>
  </n-card>
</template>

<script setup lang="ts">
import { NButton, NCard, NFlex } from 'naive-ui'
</script>
