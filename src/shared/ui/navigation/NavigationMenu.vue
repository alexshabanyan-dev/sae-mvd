<template>
  <section class="home-menu" aria-label="Перечень модулей">
    <!-- Портальный хаб: плитки по остальным screens сессии -->
    <div
      v-if="usePortalScreenTiles"
      class="home-menu__grid home-menu__grid--flat"
      aria-label="Экраны сервиса"
    >
      <button
        v-for="item in portalScreenTileItems"
        :key="`${item.screenName}-${item.viewName}`"
        type="button"
        class="home-menu__tile"
        @click="openView(item)"
      >
        <span class="home-menu__title">{{ item.title }}</span>
        <MvdIcon name="document" :size="48" class="home-menu__icon" />
      </button>
    </div>

    <!-- Иначе: tesler — меню первого экрана в сессии (navigation.menu), с группами -->
    <template v-else>
      <section
        v-for="group in groups"
        :key="group.title"
        class="home-menu__group"
        :aria-label="group.title"
      >
        <h2 class="home-menu__group-title">{{ group.title }}</h2>
        <div class="home-menu__grid">
          <button
            v-for="item in group.items"
            :key="`${item.screenName ?? ''}-${item.viewName}`"
            type="button"
            class="home-menu__tile"
            @click="openView(item)"
          >
            <span class="home-menu__title">{{ item.title }}</span>
            <MvdIcon name="document" :size="48" class="home-menu__icon" />
          </button>
        </div>
      </section>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { screenIsPortalHub } from '@/shared/navigation/portalHub'
import { useAppMetaStore } from '@/shared/store'
import { MvdIcon } from '@/shared/ui'

/** Расширение пункта меню: межэкранный переход (см. mock `MenuChildDto.screenName` на бэке). */
interface MenuCardItem {
  viewName: string
  screenName?: string
  title: string
}

interface MenuCardGroup {
  title: string
  items: MenuCardItem[]
}

function isNavChild(item: unknown): item is { viewName: string; screenName?: string } {
  return (
    typeof item === 'object' &&
    item !== null &&
    'viewName' in item &&
    typeof (item as { viewName: unknown }).viewName === 'string'
  )
}

const appMetaStore = useAppMetaStore()
const { navigation, activeScreenName, activeScreen, screens } = storeToRefs(appMetaStore)
const router = useRouter()

/** Дефолтный экран с межэкранным меню — плитки по остальным screens. */
const usePortalScreenTiles = computed(() =>
  activeScreen.value ? screenIsPortalHub(activeScreen.value) : false,
)

const portalScreenTileItems = computed<MenuCardItem[]>(() => {
  const hub = activeScreen.value
  if (!usePortalScreenTiles.value || !hub) return []
  return screens.value
    .filter((s) => s.name !== hub.name)
    .map((s) => ({
      screenName: s.name,
      viewName: s.primaryViewName,
      title: s.title,
    }))
})

function openView(item: MenuCardItem) {
  const screenName = item.screenName ?? activeScreenName.value
  if (!screenName) return
  appMetaStore.setActiveScreen(screenName)
  void router.push({ name: 'view', params: { screenName, viewName: item.viewName } })
}

function formatTitle(viewName: string) {
  return viewName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/^./, (char) => char.toUpperCase())
}

function resolveTitle(viewName: string, targetScreenName?: string | null) {
  const screen = targetScreenName
    ? screens.value.find((s) => s.name === targetScreenName)
    : activeScreen.value
  const found = screen?.views?.find((v) => v.name === viewName)
  return found?.title ?? formatTitle(viewName)
}

const groups = computed<MenuCardGroup[]>(() => {
  const menu = navigation.value?.menu
  if (!menu?.length) return []

  const result: MenuCardGroup[] = []

  for (const entry of menu) {
    if ('child' in entry && Array.isArray(entry.child)) {
      const groupTitle = entry.title ?? 'Раздел'
      const items = entry.child.filter(isNavChild).map((item) => ({
        viewName: item.viewName,
        screenName: typeof item.screenName === 'string' ? item.screenName : undefined,
        title: resolveTitle(item.viewName, item.screenName),
      }))

      if (items.length) {
        result.push({ title: groupTitle, items })
      }
      continue
    }

    if ('viewName' in entry && typeof entry.viewName === 'string') {
      result.push({
        title: 'Раздел',
        items: [{ viewName: entry.viewName, title: resolveTitle(entry.viewName) }],
      })
    }
  }

  return result
})
</script>

<style scoped>
.home-menu {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: stretch;
}

.home-menu__group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.home-menu__group-title {
  margin: 0;
  color: #2a3c49;
  font-family: 'PT Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.1px;
}

.home-menu__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.home-menu__grid--flat {
  margin-top: 0;
}

.home-menu__tile {
  width: 292px;
  height: 106px;
  padding: 13px 12px;
  border: 0;
  border-radius: 3px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(42, 60, 73, 0.12);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
}

.home-menu__title {
  color: #2a3c49;
  font-family: 'PT Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.3px;
  text-align: left;
  max-width: 220px;
}

.home-menu__icon {
  align-self: flex-end;
  opacity: 0.35;
}
</style>
