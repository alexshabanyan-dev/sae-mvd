<template>
  <n-card
    size="small"
    bordered
    aria-label="Элементы выбора"
    :style="cardShellStyle"
    :content-style="cardContentStyle"
  >
    <n-flex vertical :size="0" :style="cardBodyStretch">
      <n-collapse :default-expanded-names="['selection-elements']">
        <n-collapse-item title="Элементы выбора" name="selection-elements">
          <n-grid :cols="24" :x-gap="24" :y-gap="16">
            <!-- header -->
            <n-gi :span="9" />
            <n-gi :span="5">
              <n-text strong>Checkbox</n-text>
            </n-gi>
            <n-gi :span="5">
              <n-text strong>Radiobutton</n-text>
            </n-gi>
            <n-gi :span="5">
              <n-text strong>Switch</n-text>
            </n-gi>

            <template v-for="row in rowDefs" :key="row.key">
              <n-gi :span="9">
                <n-text>{{ row.label }}</n-text>
              </n-gi>

              <n-gi :span="5">
                <n-form-item
                  v-bind="formItemProps(row)"
                  :show-label="false"
                  :show-feedback="false"
                >
                  <n-checkbox
                    v-model:checked="checkedByKey[row.key]"
                    size="small"
                    :disabled="row.disabled"
                  >
                    Чек-бокс с текстом
                  </n-checkbox>
                </n-form-item>
              </n-gi>

              <n-gi :span="5">
                <n-form-item
                  v-bind="formItemProps(row)"
                  :show-label="false"
                  :show-feedback="false"
                >
                  <n-radio-group
                    :value="checkedByKey[row.key] ? rowOnly : null"
                    size="small"
                    :name="`selection-radio-${row.key}`"
                    :disabled="row.disabled"
                    @update:value="onRadioUpdate(row.key, $event)"
                  >
                    <n-radio :value="rowOnly">Радио-баттон с текстом</n-radio>
                  </n-radio-group>
                </n-form-item>
              </n-gi>

              <n-gi :span="5">
                <n-form-item
                  v-bind="formItemProps(row)"
                  :show-label="false"
                  :show-feedback="false"
                >
                  <n-space :size="8" align="center" :wrap="false">
                    <n-switch
                      v-model:value="checkedByKey[row.key]"
                      size="small"
                      :disabled="row.disabled"
                    />
                    <n-text>Свитч с текстом</n-text>
                  </n-space>
                </n-form-item>
              </n-gi>
            </template>
          </n-grid>
        </n-collapse-item>
      </n-collapse>
    </n-flex>
  </n-card>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";
import { reactive } from "vue";
import {
  NCard,
  NCheckbox,
  NCollapse,
  NCollapseItem,
  NFlex,
  NFormItem,
  NGi,
  NGrid,
  NRadio,
  NRadioGroup,
  NSpace,
  NSwitch,
  NText,
} from "naive-ui";

/** Высота строки грида задаётся соседом — карточка тянется на всю ячейку. */
const cardShellStyle: CSSProperties = {
  height: "100%",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
};

/** Область под заголовком карточки — колонка, чтобы тело заняло остаток высоты. */
const cardContentStyle: CSSProperties = {
  flex: "1 1 auto",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
};

const cardBodyStretch: CSSProperties = {
  flex: "1 1 auto",
  minHeight: 0,
  minWidth: 0,
  width: "100%",
};

const rowOnly = "only" as const;

type RowDef = {
  key: string;
  label: string;
  disabled: boolean;
  hasError: boolean;
};

/** Без отдельных строк «при наведении»: в Naive нет зафиксированного hover без кастомного CSS. */
const rowDefs: RowDef[] = [
  {
    key: "default",
    label: "Можно отметить",
    disabled: false,
    hasError: false,
  },
  {
    key: "selected",
    label: "Выбранный",
    disabled: false,
    hasError: false,
  },
  {
    key: "disabled",
    label: "Недоступен",
    disabled: true,
    hasError: false,
  },
  {
    key: "disabledSelected",
    label: "Недоступен, отмечен",
    disabled: true,
    hasError: false,
  },
  {
    key: "error",
    label: "С ошибкой",
    disabled: false,
    hasError: true,
  },
];

const checkedByKey = reactive<Record<string, boolean>>({
  default: false,
  selected: true,
  disabled: false,
  disabledSelected: true,
  error: false,
});

function onRadioUpdate(
  key: string,
  value: string | number | boolean | null,
): void {
  checkedByKey[key] = value === rowOnly;
}

function formItemProps(row: RowDef): { validationStatus?: "error" } {
  return row.hasError ? { validationStatus: "error" as const } : {};
}
</script>
