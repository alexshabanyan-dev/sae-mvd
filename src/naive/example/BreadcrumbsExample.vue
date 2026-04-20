<template>
  <n-card size="small" bordered aria-label="Drawer">
    <n-flex vertical :size="0">
      <n-collapse :default-expanded-names="['drawer']">
        <n-collapse-item title="Хлебные крошки" name="drawer">
          <router-link v-slot="{ navigate }" :to="{ name: 'home.section' }" custom>
            <n-button @click="navigate">Переход</n-button>
          </router-link>
        </n-collapse-item>
      </n-collapse>
    </n-flex>
  </n-card>
</template>
