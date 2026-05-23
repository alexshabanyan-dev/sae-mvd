<template>
  <!-- Точка входа: meta + replace на дефолтный screen/view. -->
  <span class="screen-page-bootstrap" aria-hidden="true" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppMetaStore } from '@/shared/store'

const appMetaStore = useAppMetaStore()
const router = useRouter()

onMounted(async () => {
  if (!appMetaStore.contractMeta) {
    await appMetaStore.loadContractMeta()
  }

  const target =
    appMetaStore.screens.find((s) => s.defaultScreen) ?? appMetaStore.screens[0] ?? null
  if (!target) return

  await router.replace({
    name: 'view',
    params: { screenName: target.name, viewName: target.primaryViewName },
  })
})
</script>

<style scoped>
.screen-page-bootstrap {
  display: none;
}
</style>
