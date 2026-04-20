<template>
  <div class="mvd-sub-header__breadcrumb-wrap">
    <n-breadcrumb v-if="breadcrumbItems.length" class="mvd-sub-header__breadcrumbs">
      <n-breadcrumb-item
        v-for="(item, index) in breadcrumbItems"
        :key="index"
        :clickable="false"
      >
        <template #separator>
          <MvdIcon name="arrows" :size="8" class="mvd-sub-header__breadcrumb-separator-icon" />
        </template>
        <router-link
          v-if="item.to && index < breadcrumbItems.length - 1"
          v-slot="{ navigate, href }"
          :to="item.to"
          custom
        >
          <a class="mvd-sub-header__breadcrumb-link" :href="href" @click="navigate">
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
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { useRoute, type RouteLocationRaw } from 'vue-router'

import { MvdIcon } from '@/shared/ui/mvd-icon'

const route = useRoute()

type BreadcrumbItem = { label: string; to?: RouteLocationRaw }

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const trail = route.meta.breadcrumbs
  if (trail?.length) {
    return trail.map((s) => ({ label: s.label, to: s.to }))
  }
  const label = route.meta.breadcrumbLabel ?? route.meta.pageTitle
  return label ? [{ label: String(label) }] : []
})
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
