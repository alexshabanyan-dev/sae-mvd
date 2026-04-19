<template>
  <n-collapse :default-expanded-names="['small-buttons']">
    <n-collapse-item title="Маленькие кнопки" name="small-buttons">
      <!-- Один `n-grid`: `y-gap` даёт расстояние между строками; два сетки подряд — зазор между ними не из темы Naive -->
      <n-grid :cols="24" :x-gap="24" :y-gap="24">
        <n-gi :span="3">Обычное состояние</n-gi>
        <n-gi :span="3">
          <n-button type="success" size="small">Сохранить</n-button>
        </n-gi>
        <n-gi :span="3">
          <n-button type="primary" size="small">Сохранить</n-button>
        </n-gi>
        <n-gi :span="3">
          <n-button type="error" size="small">Отменить</n-button>
        </n-gi>
        <n-gi :span="3">
          <n-button type="default" size="small">Распечатать</n-button>
        </n-gi>
        <n-gi :span="3">
          <n-dropdown
            trigger="hover"
            size="small"
            placement="bottom-start"
            :show-arrow="false"
            :options="options"
          >
            <n-button
              type="success"
              size="small"
              icon-placement="right"
              :render-icon="
                () =>
                  h(MvdIcon, {
                    name: 'arrow-down',
                    tone: 'white',
                    width: '8.333px',
                    height: '4.146px',
                  })
              "
              >Сохранить</n-button
            >
          </n-dropdown>
        </n-gi>

        <n-gi :span="3">
          <n-dropdown
            trigger="hover"
            size="small"
            placement="bottom-start"
            :show-arrow="false"
            :options="options"
          >
            <n-button
              type="primary"
              size="small"
              icon-placement="right"
              :render-icon="
                () =>
                  h(MvdIcon, {
                    name: 'arrow-down',
                    tone: 'white',
                    width: '8.333px',
                    height: '4.146px',
                  })
              "
              >Создать</n-button
            >
          </n-dropdown>
        </n-gi>
        <!-- 7×3 = 21 < 24: без добора Naive кладёт следующую ячейку в хвост этой же строки -->
        <n-gi :span="3" />

        <n-gi :span="3">Недоступно</n-gi>
        <n-gi :span="3">
          <n-button type="success" size="small" :disabled="true">Сохранить</n-button>
        </n-gi>
        <n-gi :span="3">
          <n-button type="primary" size="small" :disabled="true">Сохранить</n-button>
        </n-gi>
        <n-gi :span="3">
          <n-button type="error" size="small" :disabled="true">Отменить</n-button>
        </n-gi>
        <n-gi :span="3">
          <n-button type="default" size="small" :disabled="true">Распечатать</n-button>
        </n-gi>
        <n-gi :span="3">
          <n-dropdown
            trigger="hover"
            size="small"
            placement="bottom-start"
            :show-arrow="false"
            :options="options"
          >
            <n-button
              type="success"
              size="small"
              icon-placement="right"
              disabled
              :render-icon="
                () =>
                  h(MvdIcon, {
                    name: 'arrow-down',
                    tone: 'white',
                    width: '8.333px',
                    height: '4.146px',
                  })
              "
              >Сохранить</n-button
            >
          </n-dropdown>
        </n-gi>

        <n-gi :span="3">
          <n-dropdown
            trigger="hover"
            size="small"
            placement="bottom-start"
            :show-arrow="false"
            :options="options"
          >
            <n-button
              type="primary"
              size="small"
              icon-placement="right"
              disabled
              :render-icon="
                () =>
                  h(MvdIcon, {
                    name: 'arrow-down',
                    tone: 'white',
                    width: '8.333px',
                    height: '4.146px',
                  })
              "
              >Создать</n-button
            >
          </n-dropdown>
        </n-gi>
      </n-grid>
    </n-collapse-item>
  </n-collapse>
</template>

<script setup lang="ts">
import { MvdIcon } from '@/shared/ui/mvd-icon'
import { NCollapse, NCollapseItem } from 'naive-ui'
import { h } from 'vue'

const options = [
  {
    label: 'Marina Bay Sands',
    key: 'marina bay sands',
  },
  {
    label: "Brown's Hotel, London",
    key: "brown's hotel, london",
  },
  {
    label: 'Atlantis Bahamas, Nassau',
    key: 'atlantis nahamas, nassau',
  },
  {
    label: 'The Beverly Hills Hotel, Los Angeles',
    key: 'the beverly hills hotel, los angeles',
  },
]
</script>
