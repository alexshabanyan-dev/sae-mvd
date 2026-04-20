<template>
  <n-card size="small" bordered aria-label="Drawer">
    <n-flex vertical :size="0">
      <n-collapse :default-expanded-names="['drawer']">
        <n-collapse-item title="Выдвижная панель (Drawer)" name="drawer">
          <n-flex vertical :size="12">
            <n-button-group>
              <n-button @click="activate('top')"> Top </n-button>
              <n-button @click="activate('right')"> Right </n-button>
              <n-button @click="activate('bottom')"> Bottom </n-button>
              <n-button @click="activate('left')"> Left </n-button>
            </n-button-group>
            <n-drawer v-model:show="active" :width="502" :placement="placement">
              <n-drawer-content title="Stoner">
                Stoner is a 1965 novel by the American writer John Williams.
              </n-drawer-content>
            </n-drawer>
          </n-flex>
        </n-collapse-item>
      </n-collapse>
    </n-flex>
  </n-card>
</template>

<script setup lang="ts">
import type { DrawerPlacement } from 'naive-ui'
import { ref } from 'vue'

const active = ref(false)
const placement = ref<DrawerPlacement>('right')
function activate(place: DrawerPlacement) {
  active.value = true
  placement.value = place
}
</script>
