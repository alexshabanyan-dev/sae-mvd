<template>
  <div class="mvd-sub-header__breadcrumb-wrap">
    <n-breadcrumb v-if="breadcrumbItems.length" class="mvd-sub-header__breadcrumbs">
      <n-breadcrumb-item
        v-for="(item, index) in breadcrumbItems"
        :key="item.key"
        :clickable="false"
      >
        <template #separator>
          <MvdIcon name="arrows" :size="8" class="mvd-sub-header__breadcrumb-separator-icon" />
        </template>
        <router-link
          v-if="item.to && index < breadcrumbItems.length - 1"
          v-slot="{ href }"
          :to="item.to"
          custom
        >
          <a class="mvd-sub-header__breadcrumb-link" :href="href" @click.prevent="onCrumbClick(item)">
            {{ item.label }}
          </a>
        </router-link>
        <span v-else class="mvd-sub-header__breadcrumb-current">{{ item.label }}</span>
      </n-breadcrumb-item>
    </n-breadcrumb>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MvdSubHeaderBreadcrumbs' })
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { useRoute, useRouter, type RouteLocationRaw } from 'vue-router'

import { resolveShellStepLabel } from '@/shared/navigation/shellBreadcrumbLabels'
import { useAppMetaStore, useShellNavigationStore } from '@/shared/store'

import { MvdIcon } from '@/shared/ui/mvd-icon'

const route = useRoute()
const router = useRouter()
const appMetaStore = useAppMetaStore()
const shellStore = useShellNavigationStore()
const { name: serviceName, screens } = storeToRefs(appMetaStore)
const { trail } = storeToRefs(shellStore)

type BreadcrumbItem = { key: string; label: string; to?: RouteLocationRaw }

/** Только явный `meta.breadcrumbs` переопределяет shell (редкие статические экраны). */
const metaBreadcrumbOverride = computed<BreadcrumbItem[]>(() => {
  const trailMeta = route.meta.breadcrumbs
  if (!trailMeta?.length) return []
  return trailMeta.map((s, i) => ({
    key: `meta-${i}-${s.label}`,
    label: s.label,
    to: s.to,
  }))
})

/** Shell: сервис + посещённые (screen|view); последний без ссылки. */
const shellItems = computed<BreadcrumbItem[]>(() => {
  const steps = trail.value
  if (!steps.length) return []

  const items: BreadcrumbItem[] = []
  const svc = serviceName.value?.trim()
  if (svc) {
    items.push({
      key: 'service',
      label: svc,
      to: { name: 'home' },
    })
  }

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    const isLast = i === steps.length - 1
    const label = resolveShellStepLabel(screens.value, step.screenName, step.viewName)
    const key = `${step.screenName}|${step.viewName}`
    if (isLast) {
      items.push({ key, label })
    } else {
      items.push({
        key,
        label,
        to: {
          name: 'view',
          params: { screenName: step.screenName, viewName: step.viewName },
        },
      })
    }
  }

  return items
})

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const override = metaBreadcrumbOverride.value
  if (override.length) return override

  const shell = shellItems.value
  if (shell.length) return shell

  const label = route.meta.breadcrumbLabel ?? route.meta.pageTitle
  return label ? [{ key: 'fallback', label: String(label) }] : []
})

function onCrumbClick(item: BreadcrumbItem) {
  if (!item.to) return
  void router.push(item.to)
}
</script>

<style scoped>
.mvd-sub-header__breadcrumb-wrap {
  min-width: 0;
}

.mvd-sub-header__breadcrumbs {
  font-weight: 400;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

/* Как в макете крошек (Figma 62-7269): ссылки на пройденные уровни — с подчёркиванием в покое. */
.mvd-sub-header__breadcrumb-link {
  color: var(--mvd-color-link);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: var(--mvd-color-link-underline-hover);
}

.mvd-sub-header__breadcrumb-link:hover {
  text-decoration-color: var(--mvd-color-link);
}

.mvd-sub-header__breadcrumb-current {
  color: #2a3c49;
}

.mvd-sub-header__breadcrumb-separator-icon {
  flex-shrink: 0;
}

/* Naive: padding у «ссылки» крошки 4px — убираем; сепаратор — ровно 8px слева и справа от иконки. */
.mvd-sub-header__breadcrumbs :deep(.n-breadcrumb-item .n-breadcrumb-item__link) {
  padding: 0;
  border-radius: 0;
}

.mvd-sub-header__breadcrumbs :deep(.n-breadcrumb-item--clickable .n-breadcrumb-item__link:hover),
.mvd-sub-header__breadcrumbs :deep(.n-breadcrumb-item--clickable .n-breadcrumb-item__link:active) {
  background-color: transparent;
}

.mvd-sub-header__breadcrumbs :deep(.n-breadcrumb-item .n-breadcrumb-item__separator) {
  margin: 0 8px;
}
</style>
