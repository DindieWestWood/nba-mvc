import { onBeforeUnmount, onMounted, ref } from 'vue'

const defaultWidth = typeof window !== 'undefined' ? window.innerWidth : 0
const defaultHeight = typeof window !== 'undefined' ? window.innerHeight : 0

/**
 * Tracks the viewport width and height reactively.
 */
export function useScreen() {
  const width = ref(defaultWidth)
  const height = ref(defaultHeight)

  const updateSize = () => {
    if (typeof window === 'undefined') return
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    updateSize()
    window.addEventListener('resize', updateSize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateSize)
  })

  return {
    width,
    height,
  }
}
