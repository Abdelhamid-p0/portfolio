import { ref } from 'vue'

export type Theme = 'dark' | 'light'

const storedTheme = localStorage.getItem('portfolio-theme')
export const theme = ref<Theme>(storedTheme === 'light' ? 'light' : 'dark')

export function setTheme(nextTheme: Theme) {
  theme.value = nextTheme
  document.documentElement.dataset.theme = nextTheme
  localStorage.setItem('portfolio-theme', nextTheme)
}

export function useTheme() {
  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}