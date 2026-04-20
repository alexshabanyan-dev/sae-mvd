<template>
  <!-- Текстовый контрол «Назад» ([Figma 62-7318](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-7318&m=dev)). Родитель монтирует компонент только при `v-if`. -->
  <button
    type="button"
    class="mvd-sub-header__back"
    aria-label="Назад на предыдущую страницу"
    @click="onBack"
  >
    <MvdIcon
      name="arrow-back"
      :width="11.333"
      :height="4.461"
      class="mvd-sub-header__back-icon"
    />
    <span class="mvd-sub-header__back-label">Назад</span>
  </button>
</template>

<script setup lang="ts">
defineOptions({ name: 'MvdSubHeaderBackButton' })
import { useRoute, useRouter } from 'vue-router'

import { MvdIcon } from '@/shared/ui/mvd-icon'

const route = useRoute()
const router = useRouter()

function onBack() {
  const fallback = route.meta.subHeaderBackFallback ?? { name: 'home' }
  if (typeof window !== 'undefined' && window.history.length > 1) {
    void router.back()
  } else {
    void router.push(fallback)
  }
}
</script>

<style scoped>
/**
 * Текстовая «кнопка» как в макете: без заливки Naive Button, кегль и трекинг как у крошек,
 * иконка по макету 11.333×4.461 (#B8BEC6 в SVG), подпись — с подчёркиванием.
 */
.mvd-sub-header__back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
  letter-spacing: 0.5px;
  color: var(--mvd-color-link);
}

.mvd-sub-header__back:focus-visible {
  outline: 2px solid var(--mvd-color-link);
  outline-offset: 2px;
  border-radius: 2px;
}

.mvd-sub-header__back-icon {
  flex-shrink: 0;
}

.mvd-sub-header__back-label {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: var(--mvd-color-link-underline-hover);
}

.mvd-sub-header__back:hover .mvd-sub-header__back-label {
  text-decoration-color: var(--mvd-color-link);
}
</style>
