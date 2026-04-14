<template>
  <footer class="iscod-footer" role="contentinfo">
    <n-flex class="iscod-footer__inner" justify="space-between" align="center" :wrap="false" :size="24">
      <n-flex class="iscod-footer__copyright" align="start" :wrap="false" :size="8">
        <span class="iscod-footer__text">©</span>
        <span class="iscod-footer__text">{{ copyrightText }}</span>
      </n-flex>

      <n-flex class="iscod-footer__right" align="center" :wrap="false" :size="32">
        <n-flex vertical class="iscod-footer__support" align="end" :wrap="false" :size="0">
          <span class="iscod-footer__text iscod-footer__text--right">{{ supportLine1 }}</span>
          <span class="iscod-footer__text iscod-footer__text--right">{{ supportLine2 }}</span>
        </n-flex>

        <div class="iscod-footer__divider" aria-hidden="true" />

        <n-flex vertical class="iscod-footer__contacts" align="end" :wrap="false" :size="0">
          <span class="iscod-footer__text iscod-footer__text--right">{{ email }}</span>
          <span class="iscod-footer__text iscod-footer__text--right">{{ messageCta }}</span>
        </n-flex>
      </n-flex>
    </n-flex>
  </footer>
</template>

<script setup lang="ts">
defineOptions({ name: 'IscodFooter' })
import { NFlex } from 'naive-ui'

withDefaults(
  defineProps<{
    copyrightText?: string
    supportLine1?: string
    supportLine2?: string
    email?: string
    messageCta?: string
  }>(),
  {
    copyrightText: 'Подсистема ФР-Оповещение сервиса ИБД-Ф МВД России, 2024',
    supportLine1: 'Круглосуточная служба поддержки ЕЦЭ ИСОД МВД России',
    supportLine2: '8 (800) 2000-462 (звонок бесплатный), 8 (495) 031-67-17',
    email: 'helpdesk@mvd.ru',
    messageCta: 'Отправить сообщение',
  },
)
</script>

<style scoped>
.iscod-footer {
  box-sizing: border-box;
  width: 100%;
  min-height: 68px;
  background: #1d6da8;
  color: #ffffff;
  font-family:
    'PT Sans',
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
}

.iscod-footer__inner {
  box-sizing: border-box;
  width: 100%;
  min-height: 68px;
  padding-inline: 32px;
}

.iscod-footer__copyright {
  min-width: 0;
}

.iscod-footer__right {
  flex-shrink: 0;
}

.iscod-footer__contacts {
  flex-shrink: 0;
}

.iscod-footer__support {
  flex-shrink: 0;
}

.iscod-footer__divider {
  width: 1px;
  height: 40px;
  background: #ffffff;
  opacity: 0.3;
}

.iscod-footer__text {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.3px;
  color: #ffffff;
  white-space: nowrap;
}

.iscod-footer__text--right {
  text-align: right;
}
</style>
