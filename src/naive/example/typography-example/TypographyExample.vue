<template>
  <n-card
    size="small"
    bordered
    aria-label="Семейство шрифтов PT Sans"
    :style="cardShellStyle"
    :content-style="cardContentStyle"
  >
    <n-flex vertical :size="0" :style="cardBodyStretch">
      <n-collapse :default-expanded-names="['typography']">
        <template #arrow="{ collapsed }">
          <span
            class="typography-example__arrow"
            :class="{ 'typography-example__arrow--compensate': !collapsed }"
            aria-hidden="true"
          >
            <svg
              v-if="collapsed"
              class="typography-example__arrow-svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.75 4.5L11.25 9L6.75 13.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              v-else
              class="typography-example__arrow-svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 9H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </span>
        </template>
        <n-collapse-item title="Типографика" name="typography">
          <n-flex vertical :size="24" class="typography-example__body">
            <n-text
              tag="p"
              class="typography-example__section-title"
              :style="{
                margin: 0,
                color: ISCOD.formTextColor,
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '28px',
                letterSpacing: '-0.1px',
              }"
            >
              Семейство шрифтов PT Sans
            </n-text>

            <n-flex :wrap="false" align="start" :size="32" class="typography-example__columns">
              <n-flex vertical :size="20" class="typography-example__left">
                <SpecRow>
                  <n-h1 :style="headingStyles.h1">Заголовок H1</n-h1>
                  <template #meta>PT Sans Bold<br />Font size: 24px</template>
                </SpecRow>
                <SpecRow>
                  <n-h2 :style="headingStyles.h2">Заголовок H2</n-h2>
                  <template #meta>PT Sans Bold<br />Font size: 18px</template>
                </SpecRow>
                <SpecRow>
                  <n-h3 :style="headingStyles.h3">Заголовок H3</n-h3>
                  <template #meta>PT Sans Bold<br />Font size: 16px</template>
                </SpecRow>
                <SpecRow>
                  <n-h4 :style="headingStyles.h4">Заголовок H4</n-h4>
                  <template #meta>PT Sans Bold<br />Font size: 15px</template>
                </SpecRow>
                <SpecRow>
                  <n-h5 :style="headingStyles.h5">Заголовок H5</n-h5>
                  <template #meta>PT Sans Bold<br />Font size: 14px</template>
                </SpecRow>
                <SpecRow>
                  <n-text
                    tag="span"
                    :style="{
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '0.1px',
                    }"
                  >
                    L Button
                  </n-text>
                  <template #meta>
                    PT Sans Regular<br />
                    Font size: 16px<br />
                    Line height: 20px
                  </template>
                </SpecRow>
                <SpecRow>
                  <n-text
                    tag="span"
                    :style="{
                      fontSize: '14px',
                      lineHeight: '16px',
                      letterSpacing: '0.1px',
                    }"
                  >
                    M Button
                  </n-text>
                  <template #meta>
                    PT Sans Regular<br />
                    Font size: 14px<br />
                    Line height: 16px
                  </template>
                </SpecRow>
                <SpecRow>
                  <n-text
                    tag="span"
                    :style="{
                      fontSize: '13px',
                      lineHeight: '16px',
                      letterSpacing: '0.1px',
                    }"
                  >
                    S Button
                  </n-text>
                  <template #meta>
                    PT Sans Regular<br />
                    Font size: 13px<br />
                    Line height: 16px
                  </template>
                </SpecRow>
                <SpecRow>
                  <n-text
                    tag="span"
                    :style="{
                      fontSize: '14px',
                      lineHeight: '18px',
                      letterSpacing: '0.1px',
                    }"
                  >
                    Текст Text
                  </n-text>
                  <template #meta>
                    PT Sans Regular<br />
                    Font size: 14px<br />
                    Line height: 18px
                  </template>
                </SpecRow>
              </n-flex>
            </n-flex>
          </n-flex>
        </n-collapse-item>
      </n-collapse>
    </n-flex>
  </n-card>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

import { ISCOD } from '@/naive/tokens'
import { NCard, NCollapse, NCollapseItem, NFlex, NH1, NH2, NH3, NH4, NH5, NText } from 'naive-ui'

/**
 * Витрина 02_Typography по [Figma 62-6702](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6702&m=dev).
 * Каркас card + collapse как SwitchExample; содержимое — из get_design_context.
 */
import SpecRow from './TypographySpecRow.vue'

const cardShellStyle: CSSProperties = {
  height: '100%',
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
}

const cardContentStyle: CSSProperties = {
  flex: '1 1 auto',
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
}

const cardBodyStretch: CSSProperties = {
  flex: '1 1 auto',
  minHeight: 0,
  minWidth: 0,
  width: '100%',
}

const figmaBodyTextColor = ISCOD.formTextColor

/** Кегли / трекинг из [Figma 62-6702](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6702&m=dev). */
const headingStyles = {
  h1: { margin: 0, letterSpacing: '-0.1px' },
  h2: { margin: 0, letterSpacing: '0' },
  h3: { margin: 0, letterSpacing: '0.1px' },
  h4: { margin: 0, letterSpacing: '0.3px' },
  h5: { margin: 0, letterSpacing: '0.3px' },
} as const
</script>

<style scoped>
.typography-example__body {
  color: v-bind(figmaBodyTextColor);
}

.typography-example__section-title {
  white-space: nowrap;
}

.typography-example__columns {
  width: 100%;
}

.typography-example__left {
  flex: 1 1 0;
  min-width: 0;
}

.typography-example__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: inherit;
}

.typography-example__arrow--compensate {
  transform: rotate(-90deg);
}

.typography-example__arrow-svg {
  display: block;
}
</style>
