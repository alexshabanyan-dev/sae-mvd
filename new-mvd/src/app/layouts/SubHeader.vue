<template>
  <section class="iscod-sub-header" aria-label="Подзаголовок страницы">
    <n-flex vertical class="iscod-sub-header__inner" :wrap="false" :size="16">
      <n-flex class="iscod-sub-header__navigation" align="center" :wrap="false" :size="0">
        <n-flex vertical class="iscod-sub-header__breadcrumb-wrap" :wrap="false" :size="2">
          <span class="iscod-sub-header__breadcrumb">{{ resolvedBreadcrumb }}</span>
        </n-flex>
      </n-flex>

      <n-flex vertical class="iscod-sub-header__title-wrap" :wrap="false" :size="12">
        <h1 class="iscod-sub-header__title">{{ resolvedTitle }}</h1>
      </n-flex>
    </n-flex>
  </section>
</template>

<script setup lang="ts">
defineOptions({ name: 'IscodSubHeader' })
import { computed } from 'vue'
import { NFlex } from 'naive-ui'
import { useRoute } from 'vue-router'

const route = useRoute()

const resolvedTitle = computed(() => route.meta.pageTitle ?? '')
const resolvedBreadcrumb = computed(() => route.meta.breadcrumbLabel ?? route.meta.pageTitle ?? '')
</script>

<style scoped>
.iscod-sub-header {
  box-sizing: border-box;
  width: 100%;
  background: #ffffff;
}

.iscod-sub-header__inner {
  box-sizing: border-box;
  width: 100%;
  padding: 20px 42px;
}

.iscod-sub-header__navigation {
  min-height: 12px;
}

.iscod-sub-header__breadcrumb-wrap {
  min-width: 0;
}

.iscod-sub-header__breadcrumb {
  color: #2a3c49;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.iscod-sub-header__title-wrap {
  width: 940px;
  max-width: 100%;
}

.iscod-sub-header__title {
  margin: 0;
  color: #2a3c49;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.1px;
}
</style>
