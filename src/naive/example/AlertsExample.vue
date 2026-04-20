<template>
  <n-card size="small" bordered aria-label="Уведомления">
    <n-flex vertical :size="12">
      <n-alert
        type="info"
        :show-icon="false"
        :bordered="true"
        :closable="true"
        :theme-overrides="blueOverrides"
      >
        <n-flex justify="center">
          <n-text>Необходимо внести все обязательные медицинские документы</n-text>
        </n-flex>
      </n-alert>

      <n-alert
        type="error"
        :show-icon="false"
        :bordered="true"
        :closable="false"
        :theme-overrides="redOverrides"
      >
        <n-flex justify="center">
          <n-text>Необходимо заполнить все обязательные поля</n-text>
        </n-flex>
      </n-alert>

      <n-alert
        type="warning"
        :show-icon="false"
        :bordered="true"
        :closable="true"
        :theme-overrides="yellowOverrides"
      >
        <n-flex justify="center">
          <n-text>Выбрано максимально количество дел для печати</n-text>
        </n-flex>
      </n-alert>

      <n-alert
        type="success"
        :show-icon="false"
        :bordered="true"
        :closable="true"
        :theme-overrides="greenOverrides"
      >
        <n-flex justify="center">
          <n-text>Документ успешно выдан</n-text>
        </n-flex>
      </n-alert>
    </n-flex>
  </n-card>
</template>

<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { NAlert, NCard, NFlex, NText } from 'naive-ui'

type AlertThemeVars = NonNullable<GlobalThemeOverrides['Alert']>

/** Цвета и типографика по [Figma 62-7136](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-7136&m=dev) (через MCP). */
const baseBody: Pick<
  AlertThemeVars,
  'padding' | 'fontSize' | 'lineHeight' | 'borderRadius'
> = {
  padding: '8px',
  fontSize: '14px',
  lineHeight: '18px',
  borderRadius: '0',
}

const blueOverrides: Partial<AlertThemeVars> = {
  ...baseBody,
  borderInfo: '1px solid #1D6DA8',
  colorInfo: '#E0F2FF',
  contentTextColorInfo: '#1D6DA8',
  titleTextColorInfo: '#1D6DA8',
  iconColorInfo: '#1D6DA8',
  closeIconColorInfo: '#1D6DA8',
  closeIconColorHoverInfo: '#1D6DA8',
  closeIconColorPressedInfo: '#1D6DA8',
  closeColorHoverInfo: 'transparent',
  closeColorPressedInfo: 'transparent',
  closeIconSize: '20px',
  closeSize: '20px',
  closeMargin: '8px 8px 8px 0',
}

const redOverrides: Partial<AlertThemeVars> = {
  ...baseBody,
  borderError: '1px solid #D94043',
  colorError: '#FFEFED',
  contentTextColorError: '#D94043',
  titleTextColorError: '#D94043',
  iconColorError: '#D94043',
}

const yellowOverrides: Partial<AlertThemeVars> = {
  ...baseBody,
  borderWarning: '1px solid #DCAA13',
  colorWarning: '#FFF7DE',
  contentTextColorWarning: '#DCAA13',
  titleTextColorWarning: '#DCAA13',
  iconColorWarning: '#DCAA13',
  closeIconColorWarning: '#DCAA13',
  closeIconColorHoverWarning: '#DCAA13',
  closeIconColorPressedWarning: '#DCAA13',
  closeColorHoverWarning: 'transparent',
  closeColorPressedWarning: 'transparent',
  closeIconSize: '20px',
  closeSize: '20px',
  closeMargin: '8px 8px 8px 0',
}

const greenOverrides: Partial<AlertThemeVars> = {
  ...baseBody,
  borderSuccess: '1px solid #19894B',
  colorSuccess: '#CAF2DC',
  contentTextColorSuccess: '#19894B',
  titleTextColorSuccess: '#19894B',
  iconColorSuccess: '#19894B',
  closeIconColorSuccess: '#19894B',
  closeIconColorHoverSuccess: '#19894B',
  closeIconColorPressedSuccess: '#19894B',
  closeColorHoverSuccess: 'transparent',
  closeColorPressedSuccess: 'transparent',
  closeIconSize: '20px',
  closeSize: '20px',
  closeMargin: '8px 8px 8px 0',
}
</script>
