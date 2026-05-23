<template>
  <section class="view-page">
    <!-- Дефолтный экран, primary view и меню с межэкранными пунктами — плитки портала (shell). -->
    <template v-if="isPortalShell">
      <NavigationMenu />
    </template>
    <template v-else>
      <h1 class="view-page__title">{{ viewTitle }}</h1>
      <p class="view-page__meta">viewName: {{ routeViewName }}</p>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPlayerView, type PlayerViewResult } from '@/shared/api'
import { screenIsPortalHub } from '@/shared/navigation/portalHub'
import { useAppMetaStore } from '@/shared/store'
import { NavigationMenu } from '@/shared/ui'

const route = useRoute()
const viewData = ref<PlayerViewResult | null>(null)
const appMetaStore = useAppMetaStore()

const routeScreenName = computed(() => {
  const value = route.params.screenName
  return typeof value === 'string' ? value : ''
})

const routeViewName = computed(() => {
  const value = route.params.viewName
  return typeof value === 'string' ? value : ''
})

const routeScreenMeta = computed(() =>
  appMetaStore.screens.find((s) => s.name === routeScreenName.value),
)

/** Дефолтный экран + primary view + cross-screen navigation — портал без загрузки player view. */
const isPortalShell = computed(() => {
  const sm = routeScreenMeta.value
  return Boolean(
    sm &&
    routeViewName.value === sm.primaryViewName &&
    screenIsPortalHub(sm),
  )
})

const viewTitle = computed(() => {
  const screen = viewData.value?.businessComponents?.[0]?.primaryScreens?.[0]
  const view = screen?.primaryViews?.find((item) => item.name === routeViewName.value)
  return view?.title ?? screen?.title ?? 'Раздел'
})

watch(
  () => [routeScreenName.value, routeViewName.value] as const,
  async ([screenName, viewName]) => {
    if (!screenName || !viewName) {
      viewData.value = null
      return
    }

    if (!appMetaStore.contractMeta) {
      await appMetaStore.loadContractMeta()
    }

    appMetaStore.setActiveScreen(screenName)

    const screenMeta = appMetaStore.screens.find((s) => s.name === screenName)
    if (screenMeta && viewName === screenMeta.primaryViewName && screenIsPortalHub(screenMeta)) {
      viewData.value = null
      return
    }

    viewData.value = await fetchPlayerView({ service: 'person', screen: screenName, view: viewName })
  },
  { immediate: true },
)
</script>

<style scoped>
.view-page {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.view-page__title {
  margin: 0;
  color: #2a3c49;
  font-family: 'PT Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
}

.view-page__meta {
  margin: 0;
  color: #2a3c49;
  font-family: 'PT Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: 14px;
  line-height: 20px;
}
</style>
