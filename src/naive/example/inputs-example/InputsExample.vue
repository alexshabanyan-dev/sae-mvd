<template>
  <n-card size="small" bordered aria-label="Поля ввода">
    <n-flex vertical :size="0">
      <n-collapse :default-expanded-names="['inputs']">
        <n-collapse-item title="Поля ввода" name="inputs">
          <n-grid :cols="24" :x-gap="24" :y-gap="16">
            <n-gi :span="6" />
            <n-gi :span="9">
              <n-text strong>Без иконки</n-text>
            </n-gi>
            <n-gi :span="9">
              <n-text strong>С иконкой</n-text>
            </n-gi>

            <n-gi :span="6">
              <n-text>Пустое</n-text>
            </n-gi>
            <n-gi :span="9">
              <n-form-item :show-label="false" :show-feedback="false">
                <n-input v-model:value="emptyPlain" size="small" :style="fieldWidth" />
              </n-form-item>
            </n-gi>
            <n-gi :span="9">
              <n-form-item :show-label="false" :show-feedback="false">
                <n-input v-model:value="emptyIcon" size="small" :style="fieldWidth">
                  <template #suffix>
                    <MvdIcon name="notifications" :size="20" />
                  </template>
                </n-input>
              </n-form-item>
            </n-gi>

            <n-gi :span="6">
              <n-text>Плейсхолдер</n-text>
            </n-gi>
            <n-gi :span="9">
              <n-form-item :show-label="false" :show-feedback="false">
                <n-input
                  v-model:value="placeholderPlain"
                  size="small"
                  placeholder="Плейсхолдер"
                  :style="fieldWidth"
                />
              </n-form-item>
            </n-gi>
            <n-gi :span="9">
              <n-form-item :show-label="false" :show-feedback="false">
                <n-input
                  v-model:value="placeholderIcon"
                  size="small"
                  placeholder="Плейсхолдер"
                  :style="fieldWidth"
                >
                  <template #suffix>
                    <MvdIcon name="notifications" :size="20" />
                  </template>
                </n-input>
              </n-form-item>
            </n-gi>

            <n-gi :span="6">
              <n-text>Заполнено</n-text>
            </n-gi>
            <n-gi :span="9">
              <n-form-item :show-label="false" :show-feedback="false">
                <n-input v-model:value="filledPlain" size="small" :style="fieldWidth" />
              </n-form-item>
            </n-gi>
            <n-gi :span="9">
              <n-form-item :show-label="false" :show-feedback="false">
                <n-input v-model:value="filledIcon" size="small" :style="fieldWidth">
                  <template #suffix>
                    <MvdIcon name="notifications" :size="20" />
                  </template>
                </n-input>
              </n-form-item>
            </n-gi>

            <n-gi :span="6">
              <n-text>Фокус</n-text>
            </n-gi>
            <n-gi :span="9">
              <n-form-item :show-label="false" :show-feedback="false">
                <n-input
                  v-model:value="focusPlain"
                  size="small"
                  :style="fieldWidth"
                  placeholder="Плейсхолдер"
                />
              </n-form-item>
            </n-gi>
            <n-gi :span="9">
              <n-form-item :show-label="false" :show-feedback="false">
                <n-input v-model:value="focusIcon" size="small" :style="fieldWidth">
                  <template #suffix>
                    <MvdIcon name="notifications" :size="20" />
                  </template>
                </n-input>
              </n-form-item>
            </n-gi>

            <n-gi :span="6">
              <n-text>Недоступно</n-text>
            </n-gi>
            <n-gi :span="9">
              <n-form-item :show-label="false" :show-feedback="false">
                <n-input v-model:value="disabledText" size="small" disabled :style="fieldWidth" />
              </n-form-item>
            </n-gi>
            <n-gi :span="9">
              <n-form-item :show-label="false" :show-feedback="false">
                <n-input v-model:value="disabledText" size="small" disabled :style="fieldWidth">
                  <template #suffix>
                    <MvdIcon name="lock" :size="20" />
                  </template>
                </n-input>
              </n-form-item>
            </n-gi>

            <n-gi :span="6">
              <n-text>Ошибка</n-text>
            </n-gi>
            <n-gi :span="9">
              <n-form-item
                :show-label="false"
                validation-status="error"
                feedback="Обязательное поле не заполнено"
              >
                <n-input
                  v-model:value="errorPlain"
                  size="small"
                  status="error"
                  :style="fieldWidth"
                />
              </n-form-item>
            </n-gi>
            <n-gi :span="9">
              <n-form-item
                :show-label="false"
                validation-status="error"
                feedback="Обязательное поле не заполнено"
              >
                <n-input v-model:value="errorIcon" size="small" status="error" :style="fieldWidth">
                  <template #suffix>
                    <MvdIcon name="notifications" :size="20" />
                  </template>
                </n-input>
              </n-form-item>
            </n-gi>

            <n-gi :span="6">
              <n-text>Плейсхолдер и фокус</n-text>
            </n-gi>
            <n-gi :span="9">
              <n-form-item :show-label="false" :show-feedback="false">
                <n-input
                  v-model:value="focusPhPlain"
                  size="small"
                  placeholder="Плейсхолдер"
                  :style="fieldWidth"
                />
              </n-form-item>
            </n-gi>
            <n-gi :span="9">
              <n-form-item :show-label="false" :show-feedback="false">
                <n-input
                  v-model:value="focusPhIcon"
                  size="small"
                  placeholder="Плейсхолдер"
                  :style="fieldWidth"
                >
                  <template #suffix>
                    <MvdIcon name="notifications" :size="20" />
                  </template>
                </n-input>
              </n-form-item>
            </n-gi>

            <n-gi :span="6">
              <n-text>Список и очистка</n-text>
            </n-gi>
            <n-gi :span="9">
              <n-form-item :show-label="false" :show-feedback="false">
                <n-select
                  v-model:value="selectPlain"
                  size="small"
                  clearable
                  :options="selectOptions"
                  :style="fieldWidth"
                />
              </n-form-item>
            </n-gi>
            <n-gi :span="9">
              <n-form-item :show-label="false" :show-feedback="false">
                <n-select
                  v-model:value="selectIcon"
                  size="small"
                  clearable
                  :options="selectOptions"
                  :style="fieldWidth"
                />
              </n-form-item>
            </n-gi>
          </n-grid>
        </n-collapse-item>
      </n-collapse>
    </n-flex>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  NCard,
  NCollapse,
  NCollapseItem,
  NFlex,
  NFormItem,
  NGi,
  NGrid,
  NInput,
  NSelect,
  NText,
} from 'naive-ui'
import type { SelectOption } from 'naive-ui'

import { MvdIcon } from '@/shared/ui/mvd-icon'

const fieldWidth = { maxWidth: '221px', width: '100%' } as const

const emptyPlain = ref('')
const emptyIcon = ref('')

const placeholderPlain = ref('')
const placeholderIcon = ref('')

const filledPlain = ref('Текст введен')
const filledIcon = ref('Текст введен')

const focusPlain = ref('Вводим текст')
const focusIcon = ref('Вводим текст')

const disabledText = ref('Редактирование недоступно')

const errorPlain = ref('Ошибка')
const errorIcon = ref('Ошибка')

const focusPhPlain = ref('')
const focusPhIcon = ref('')

const selectOptions: SelectOption[] = [{ label: 'Текст введен', value: 'filled' }]
const selectPlain = ref<string | null>('filled')
const selectIcon = ref<string | null>('filled')
</script>
