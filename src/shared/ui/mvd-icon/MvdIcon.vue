<template>
  <img
    class="mvd-icon header-icon"
    :src="iconSrc"
    :alt="altText"
    :style="iconStyle"
    loading="lazy"
    decoding="async"
    draggable="false"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
defineOptions({ name: 'MvdIcon' })
import { computed } from 'vue'
import { mvdIcons } from '@mvd/ui-kit-custom'

const props = defineProps<{
  name: string
  tone?: 'default' | 'white'
  size?: number | string
  width?: number | string
  height?: number | string
}>()

const iconSrc = computed(() => {
  const resolved = mvdIcons[props.name as keyof typeof mvdIcons]
  if (!resolved) {
    throw new Error(`[MvdIcon] Icon "${props.name}" not found in @mvd/ui-kit-custom registry`)
  }
  return resolved
})

const altText = computed(() => props.name)

const iconStyle = computed(() => {
  const toCssSize = (value: number | string | undefined) =>
    typeof value === 'number' ? `${value}px` : value

  const width = toCssSize(props.width ?? props.size ?? 24) ?? '24px'
  const height = toCssSize(props.height ?? props.size ?? 24) ?? '24px'

  const style: Record<string, string> = {
    width,
    height,
  }

  if (props.tone === 'white') {
    // Convert neutral gray source icons to pure white for dark header backgrounds.
    style.filter = 'brightness(0) saturate(100%) invert(100%)'
  }

  return style
})
</script>

<style scoped>
.mvd-icon {
  display: block;
  object-fit: contain;
}
</style>
