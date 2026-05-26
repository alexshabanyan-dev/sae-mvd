<template>
  <n-layout :content-style="layoutScrollStyle">
    <n-layout-header :bordered="false" class="app-layout-header">
      <Header />
      <SubHeader />
    </n-layout-header>
    <n-layout-content :content-style="mainContentStyle">
      <div class="app-layout-body">
        <slot />
      </div>
    </n-layout-content>
    <n-layout-footer :bordered="false" class="app-layout-footer">
      <Footer />
    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader } from 'naive-ui'

import { MVD } from '@master-service/ui-kit-custom'

import Footer from './Footer.vue'
import Header from './Header.vue'
import SubHeader from './subheader/SubHeader.vue'

/** Фон шапки под SubHeader и фон полей контента — как `Layout.color`. */
const pageBackgroundColor = MVD.pageBackgroundColor
/** Отступ после заголовка; фон как у контента (`mainContentStyle`), без отдельной белой подложки. */
const pageBodyPaddingTop = MVD.pageBodyPaddingTop

const layoutScrollStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column' as const,
  backgroundColor: pageBackgroundColor,
}

const mainContentStyle = {
  padding: '0 16px 32px',
  flex: '1 1 auto',
  backgroundColor: pageBackgroundColor,
}
</script>

<style scoped>
.app-layout-header {
  display: flex;
  flex-direction: column;
  padding: 0;
  background-color: v-bind(pageBackgroundColor);
  box-shadow: var(--mvd-page-header-shadow, 0 0 12px rgba(42, 60, 73, 0.24));
  z-index: 1;
}

.app-layout-footer {
  padding: 0;
}

/** Воздух под шапкой (макет); фон не задаём — совпадает с `pageBackgroundColor` у `n-layout-content`. */
.app-layout-body {
  padding-top: v-bind(pageBodyPaddingTop);
}
</style>
