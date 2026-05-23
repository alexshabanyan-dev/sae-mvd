<template>
  <section class="mvd-sub-header" aria-label="Подзаголовок страницы">
    <!-- Крошки → «Назад»: 16px; «Назад» → заголовок: 12px -->
    <n-flex vertical class="mvd-sub-header__inner" :wrap="false" :size="12">
      <!-- <n-flex
        vertical
        class="mvd-sub-header__navigation"
        align="flex-start"
        :wrap="false"
        :size="16"
      >
        <SubHeaderBreadcrumbs />
        <SubHeaderBackButton v-if="showSubHeaderBack" />
      </n-flex> -->

      <n-flex vertical class="mvd-sub-header__title-wrap" :wrap="false" :size="12">
        <h1 class="mvd-sub-header__title">{{ resolvedTitle }}</h1>
      </n-flex>
    </n-flex>
  </section>
</template>

<script setup lang="ts">
defineOptions({ name: 'MvdSubHeader' })
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { NFlex } from 'naive-ui'
import { useRoute } from 'vue-router'

import { useAppMetaStore } from '@/shared/store'

import SubHeaderBackButton from './SubHeaderBackButton.vue'
import SubHeaderBreadcrumbs from './SubHeaderBreadcrumbs.vue'

const route = useRoute()
const { activeScreen } = storeToRefs(useAppMetaStore())

/** Как в tesler: подпись текущего экрана из session (`ScreenSummary` / `SessionScreen.text`). */
const resolvedTitle = computed(
  () => activeScreen.value?.title?.trim() || (route.meta.pageTitle as string) || '',
)

const showSubHeaderBack = computed(
  () => route.meta.hideSubHeaderBack !== true && route.name !== 'home',
)
</script>

<style scoped>
.mvd-sub-header {
  box-sizing: border-box;
  width: 100%;
  background: #ffffff;
}

.mvd-sub-header__inner {
  box-sizing: border-box;
  width: 100%;
  /* Горизонталь как у шапки (Header `padding-inline: 42px`). */
  padding: 20px 42px;
}

.mvd-sub-header__navigation {
  min-height: 12px;
}

.mvd-sub-header__title-wrap {
  width: 940px;
  max-width: 100%;
}

.mvd-sub-header__title {
  margin: 0;
  color: #2a3c49;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.1px;
}
</style>
