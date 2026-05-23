<template>
  <header class="mvd-header" role="banner">
    <n-flex
      class="mvd-header__inner"
      justify="space-between"
      align="center"
      :wrap="false"
      :size="24"
    >
      <n-flex class="mvd-header__brand" align="center" :wrap="false" :size="10">
        <div class="mvd-header__system-logo" aria-label="Логотип МВД">
          <img class="mvd-header__system-logo-main" :src="mvdWordmarkUrl" alt="ЦИФРОПОЛ МВД" />
        </div>

        <div class="mvd-header__logo-slot">
          <div
            class="mvd-header__watermark"
            aria-hidden="true"
            :style="{ backgroundImage: `url(${logoUrl})` }"
          />
          <img
            class="mvd-header__logo"
            :src="logoUrl"
            width="82"
            height="48"
            alt="Герб МВД России"
          />
        </div>
        <n-flex vertical class="mvd-header__titles" :wrap="false" :size="3">
          <span class="mvd-header__org">МВД России</span>
          <span class="mvd-header__service">{{ serviceNameTop }}</span>
          <span class="mvd-header__service">{{ serviceNameBottom }}</span>
        </n-flex>
      </n-flex>

      <n-flex class="mvd-header__actions" align="center" :wrap="false" :size="0">
        <n-flex class="mvd-header__user" align="center" :wrap="false" :size="8">
          <MvdIcon name="account" tone="white" :size="16" />
          <span class="mvd-header__user-name">{{ userDisplayName }}</span>
        </n-flex>

        <n-button
          class="mvd-header__icon-btn"
          quaternary
          size="large"
          :bordered="false"
          text-color="var(--mvd-header-text)"
          aria-label="Информация"
        >
          <template #icon>
            <MvdIcon name="info" tone="white" :size="20" />
          </template>
        </n-button>

        <n-button
          class="mvd-header__icon-btn"
          quaternary
          size="large"
          :bordered="false"
          text-color="var(--mvd-header-text)"
          aria-label="Выход"
        >
          <template #icon>
            <MvdIcon name="exit" tone="white" :width="16" :height="18" />
          </template>
        </n-button>
      </n-flex>
    </n-flex>
  </header>
</template>

<script setup lang="ts">
defineOptions({ name: 'MvdHeader' })
/**
 * Шапка МВД: бренд и градиент по PDF; раскладка — Naive Flex / Button / Divider.
 */
import { NButton, NFlex } from 'naive-ui'
import mvdWordmarkUrl from '@/assets/images/mvd-wordmark.svg?url'
import logoUrl from '@/assets/images/mvd-logo.svg?url'
import { MvdIcon } from '@/shared/ui/mvd-icon'

withDefaults(
  defineProps<{
    serviceNameTop?: string
    serviceNameBottom?: string
    userDisplayName?: string
  }>(),
  {
    serviceNameTop: 'Подсистема ФР-Оповещение',
    serviceNameBottom: 'Сервиса ИБД-Ф',
    userDisplayName: 'Имя Фамилия',
  },
)
</script>

<style scoped>
.mvd-header {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 60px;
  border-radius: 0;
  background: var(--mvd-header-solid-background, #1d6da8);
  color: var(--mvd-header-text);
  font-family:
    'PT Sans',
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
}

.mvd-header__inner {
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  width: 100%;
  min-width: 0;
  min-height: 60px;
  padding-inline: 42px;
}

.mvd-header__brand {
  min-width: 0;
}

.mvd-header__system-logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 122px;
  min-height: 26px;
  line-height: 0;
}

.mvd-header__system-logo-main {
  display: block;
  width: 122px;
  height: 26px;
  object-fit: contain;
}

.mvd-header__actions {
  flex-shrink: 0;
  border-left: 1px solid var(--mvd-header-divider, rgba(255, 255, 255, 0.3));
}

.mvd-header__user {
  min-height: 60px;
  padding: 10px 22px 10px 18px;
  border-right: 1px solid var(--mvd-header-divider, rgba(255, 255, 255, 0.3));
}

.mvd-header__logo-slot {
  position: relative;
  flex-shrink: 0;
  display: block;
  line-height: 0;
}

.mvd-header__watermark {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400%;
  height: 400%;
  min-width: 200px;
  min-height: 200px;
  max-width: 220px;
  max-height: 175px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: var(--mvd-header-watermark-opacity, 0.055);
  pointer-events: none;
  z-index: 0;
  filter: brightness(0) invert(1);
}

.mvd-header__logo {
  position: relative;
  z-index: 1;
  display: block;
  height: 38px;
  width: auto;
  object-fit: contain;
}

.mvd-header__titles {
  min-width: 0;
}

.mvd-header__org {
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.3px;
  color: var(--mvd-header-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.mvd-header__service {
  font-size: 11px;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: var(--mvd-header-subtext, #eef3f8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.mvd-header__user-name {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.3px;
  color: var(--mvd-header-text);
  white-space: nowrap;
}

.mvd-header :deep(.mvd-header__icon-btn.n-button) {
  width: 60px;
  min-height: 60px;
  border-radius: 0;
  padding: 0;
  border-right: 1px solid var(--mvd-header-divider, rgba(255, 255, 255, 0.3));
}

.mvd-header :deep(.mvd-header__icon-btn.n-button .n-button__icon) {
  margin: 0;
}

.mvd-header :deep(.n-button .header-icon) {
  color: var(--mvd-header-text);
}

@media (max-width: 1024px) {
  .mvd-header__inner {
    padding-inline: 16px;
  }
}
</style>
