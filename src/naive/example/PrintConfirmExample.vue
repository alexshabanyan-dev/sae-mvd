<template>
  <n-card size="small" bordered aria-label="Подтверждение печати">
    <n-popconfirm
      ref="popconfirmRef"
      trigger="click"
      placement="top"
      :show-arrow="true"
      :positive-text="null"
      :negative-text="null"
      :theme-overrides="popconfirmTheme"
    >
      <template #trigger>
        <n-button type="primary">Печать документа</n-button>
      </template>
      <template #action>
        <n-button size="small" :theme-overrides="yesButtonTheme" @click="onYes">Да</n-button>
        <n-button size="small" type="primary" :theme-overrides="noButtonTheme" @click="onNo">
          Нет
        </n-button>
      </template>
      Вы подтверждаете печать документа?
    </n-popconfirm>
  </n-card>
</template>

<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import type { PopconfirmInst } from 'naive-ui/es/popconfirm'
import { NButton, NCard, NPopconfirm } from 'naive-ui'
import { ref } from 'vue'

/** [Figma 62-7221](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-7221&m=dev) — NPopconfirm + themeOverrides, стрелка Naive (не PNG-хвост). */
const popconfirmRef = ref<PopconfirmInst | null>(null)

type PopconfirmTheme = NonNullable<GlobalThemeOverrides['Popconfirm']>
type ButtonTheme = NonNullable<GlobalThemeOverrides['Button']>
type PopoverPeer = NonNullable<NonNullable<PopconfirmTheme['peers']>['Popover']>

const popoverPeer: PopoverPeer = {
  borderRadius: '8px',
  boxShadow: '0px 0px 8px 0px rgba(78, 88, 124, 0.3)',
  color: '#ffffff',
  textColor: '#3b4252',
  padding: '16px',
  fontSize: '14px',
}

const popconfirmTheme: PopconfirmTheme = {
  fontSize: '14px',
  iconSize: '24px',
  iconColor: '#DCAA13',
  peers: {
    Popover: popoverPeer,
    Button: {
      heightSmall: '26px',
      fontSizeSmall: '13px',
      borderRadiusSmall: '3px',
      paddingSmall: '0 20px',
    },
  },
}

const yesButtonTheme: Partial<ButtonTheme> = {
  color: '#fafbfc',
  colorHover: '#fefefe',
  colorPressed: '#f0f2f5',
  border: '1px solid #D7DEE6',
  borderHover: '1px solid #D7DEE6',
  borderPressed: '1px solid #D7DEE6',
  textColor: '#2A3C49',
}

const noButtonTheme: Partial<ButtonTheme> = {
  colorPrimary: '#0E5C97',
  colorHoverPrimary: '#3F86BA',
  colorPressedPrimary: '#0A4A7A',
  borderPrimary: '1px solid #3978A8',
  borderHoverPrimary: '1px solid #3978A8',
  borderPressedPrimary: '1px solid #3978A8',
  textColorPrimary: '#FFFFFF',
}

function close() {
  popconfirmRef.value?.setShow(false)
}

function onYes() {
  close()
}

function onNo() {
  close()
}
</script>
