<template>
  <section class="test-page">
    <h1 class="test-page__title">Тест WidgetFormLayout (Naive NGrid, 24 col)</h1>
    <p class="test-page__hint">
      Mock meta по <code>docs/layout.md</code> — только этот файл, без общего FormWidget.
    </p>

    <n-card :title="mockWidget.title" class="test-page__card">
      <!-- header -->
      <n-flex
        v-if="headerFields.length"
        vertical
        :size="12"
        class="test-page__zone test-page__zone--header"
      >
        <span class="test-page__zone-label">layout.header</span>
        <n-flex :size="12" align="center" wrap>
          <template v-for="field in headerFields" :key="field.key">
            <TestField :field="field" />
          </template>
        </n-flex>
      </n-flex>

      <!-- aside + main rows -->
      <n-grid
        :cols="GRID_COLS"
        :x-gap="layout.xGap ?? 12"
        :y-gap="layout.yGap ?? 8"
        class="test-page__body-grid"
      >
        <n-grid-item v-if="asideFields.length" :span="asideSpan">
          <n-flex vertical :size="12" class="test-page__zone test-page__zone--aside">
            <span class="test-page__zone-label">layout.aside (span {{ asideSpan }})</span>
            <template v-for="field in asideFields" :key="field.key">
              <TestField :field="field" />
            </template>
          </n-flex>
        </n-grid-item>

        <n-grid-item :span="mainSpan">
          <n-grid
            :cols="GRID_COLS"
            :x-gap="layout.xGap ?? 12"
            :y-gap="layout.yGap ?? 8"
            class="test-page__rows-grid"
          >
            <template v-for="(row, rowIndex) in layout.rows" :key="rowIndex">
              <n-grid-item
                v-for="cell in row.cells"
                :key="`${rowIndex}-${cell.fieldKey}`"
                :span="resolveSpan(cell.span)"
                :offset="cell.offset ?? 0"
                :suffix="cell.suffix ?? false"
              >
                <TestField v-if="fieldByKey[cell.fieldKey]" :field="fieldByKey[cell.fieldKey]" />
                <n-alert v-else type="error" :bordered="false" title="Нет поля в widget.fields" />
              </n-grid-item>
            </template>
          </n-grid>
        </n-grid-item>
      </n-grid>
    </n-card>

    <n-collapse class="test-page__raw">
      <n-collapse-item title="Mock JSON (widget fragment)" name="json">
        <pre class="test-page__pre">{{ mockJson }}</pre>
      </n-collapse-item>
    </n-collapse>
  </section>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, type PropType } from 'vue'
import {
  NAlert,
  NCard,
  NCollapse,
  NCollapseItem,
  NFlex,
  NFormItem,
  NGrid,
  NGridItem,
  NInput,
  NTag,
} from 'naive-ui'

/** Целевой контракт из meta-model-ui/docs/layout.md (локальная копия для прототипа). */
const GRID_COLS = 24
const DEFAULT_CELL_SPAN = 24
const DEFAULT_ASIDE_SPAN = 6

interface WidgetFormCell {
  fieldKey: string
  span?: number
  offset?: number
  suffix?: boolean
}

interface WidgetFormRow {
  cells: WidgetFormCell[]
}

interface WidgetFormLayout {
  xGap?: number
  yGap?: number
  header?: string[]
  aside?: string[]
  asideSpan?: number
  rows: WidgetFormRow[]
}

interface WidgetFieldMock {
  key: string
  title: string
  type: 'input' | 'hint' | 'img' | 'text'
}

interface MockWidget {
  title: string
  type: 'Form'
  fields: WidgetFieldMock[]
  options: {
    layout: WidgetFormLayout
  }
}

const mockWidget: MockWidget = {
  title: 'Карточка сотрудника (mock)',
  type: 'Form',
  fields: [
    { key: 'status', title: 'Статус', type: 'hint' },
    { key: 'badge', title: 'Категория', type: 'text' },
    { key: 'photo', title: 'Фото', type: 'img' },
    { key: 'lastName', title: 'Фамилия', type: 'input' },
    { key: 'firstName', title: 'Имя', type: 'input' },
    { key: 'inn', title: 'ИНН', type: 'input' },
    { key: 'snils', title: 'СНИЛС', type: 'input' },
  ],
  options: {
    layout: {
      xGap: 12,
      yGap: 8,
      header: ['status', 'badge'],
      aside: ['photo'],
      asideSpan: 6,
      rows: [
        {
          cells: [
            { fieldKey: 'lastName', span: 12 },
            { fieldKey: 'firstName', span: 12 },
          ],
        },
        {
          cells: [
            { fieldKey: 'inn', span: 8 },
            { fieldKey: 'snils', span: 8, offset: 8, suffix: true },
          ],
        },
      ],
    },
  },
}

const layout = computed(() => mockWidget.options.layout)

const fieldByKey = computed(() => {
  const map: Record<string, WidgetFieldMock> = {}
  for (const f of mockWidget.fields) {
    map[f.key] = f
  }
  return map
})

function fieldsByKeys(keys: string[] | undefined): WidgetFieldMock[] {
  if (!keys?.length) return []
  return keys.map((k) => fieldByKey.value[k]).filter(Boolean)
}

const headerFields = computed(() => fieldsByKeys(layout.value.header))
const asideFields = computed(() => fieldsByKeys(layout.value.aside))

const asideSpan = computed(() => layout.value.asideSpan ?? DEFAULT_ASIDE_SPAN)
const mainSpan = computed(() => {
  if (!asideFields.value.length) return GRID_COLS
  return GRID_COLS - asideSpan.value
})

function resolveSpan(span: number | undefined): number {
  return span ?? DEFAULT_CELL_SPAN
}

const mockJson = computed(() =>
  JSON.stringify(
    {
      type: mockWidget.type,
      title: mockWidget.title,
      fields: mockWidget.fields,
      options: mockWidget.options,
    },
    null,
    2,
  ),
)

if (import.meta.env.DEV) {
  const used = new Set<string>()
  const zones: Array<{ name: string; keys: string[] }> = [
    { name: 'header', keys: layout.value.header ?? [] },
    { name: 'aside', keys: layout.value.aside ?? [] },
  ]
  for (const row of layout.value.rows) {
    for (const cell of row.cells) {
      zones.push({ name: 'rows', keys: [cell.fieldKey] })
    }
  }
  for (const { name, keys } of zones) {
    for (const k of keys) {
      if (used.has(k)) {
        console.warn(`[TestPage] duplicate fieldKey in layout: ${k} (zone ${name})`)
      }
      used.add(k)
      if (!fieldByKey.value[k]) {
        console.warn(`[TestPage] layout references unknown fieldKey: ${k}`)
      }
    }
  }
}

const TestField = defineComponent({
  name: 'TestField',
  props: {
    field: {
      type: Object as PropType<WidgetFieldMock>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const f = props.field
      if (f.type === 'hint') {
        return h(NAlert, { type: 'info', bordered: false, title: f.title }, () =>
          h('span', 'Информационная плашка (type: hint)'),
        )
      }
      if (f.type === 'img') {
        return h(
          'div',
          { class: 'test-field__photo' },
          h('span', { class: 'test-field__photo-placeholder' }, 'IMG'),
          h('span', { class: 'test-field__photo-label' }, f.title),
        )
      }
      if (f.type === 'text') {
        return h(NTag, { type: 'success', bordered: false }, () => 'Высокий приоритет')
      }
      return h(
        NFormItem,
        { label: f.title, labelPlacement: 'top' },
        {
          default: () =>
            h(NInput, {
              placeholder: f.title,
              value: '',
              'onUpdate:value': () => {},
            }),
        },
      )
    }
  },
})
</script>

<style scoped>
.test-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 960px;
}

.test-page__title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #2a3c49;
}

.test-page__hint {
  margin: 0;
  font-size: 14px;
  color: #5c6f7d;
}

.test-page__card {
  background: #fff;
}

.test-page__zone-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #8a9baa;
}

.test-page__zone--header {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #d8e0e6;
}

.test-page__zone--aside {
  padding: 8px;
  background: #f4f7f9;
  border-radius: 6px;
  min-height: 160px;
}

.test-page__body-grid {
  width: 100%;
}

.test-page__rows-grid {
  width: 100%;
}

.test-page__raw {
  max-width: 960px;
}

.test-page__pre {
  margin: 0;
  padding: 12px;
  font-size: 12px;
  line-height: 1.45;
  overflow: auto;
  background: #f4f7f9;
  border-radius: 6px;
}

:deep(.test-field__photo) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

:deep(.test-field__photo-placeholder) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  font-size: 14px;
  font-weight: 600;
  color: #8a9baa;
  background: #e2e8ed;
  border-radius: 6px;
}

:deep(.test-field__photo-label) {
  font-size: 13px;
  color: #5c6f7d;
}
</style>
