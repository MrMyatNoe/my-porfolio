import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
  semanticTokens: {
    colors: {
      'bg.canvas': { default: '#F5F7F8', _dark: '#0A1420' },
      'bg.surface': { default: '#FFFFFF', _dark: '#111F33' },
      'bg.surfaceSoft': { default: '#F9FAFB', _dark: '#0D1A2B' },
      'bg.surfaceRaised': { default: '#EEF2F3', _dark: '#16283F' },
      'border.default': { default: '#DCE3E7', _dark: '#223350' },
      'text.primary': { default: '#132029', _dark: '#E7EDF0' },
      'text.secondary': { default: '#51636D', _dark: '#93A5B1' },
      'text.accent': { default: '#0E8074', _dark: '#2FB8AE' },
      'text.accentPurple': { default: '#6B46C1', _dark: '#B39DFF' },
      'text.accentAmber': { default: '#975A16', _dark: '#FDBA5C' },
    },
  },
  styles: {
    global: {
      // Offsets native anchor-scroll targets (Header's nav links, Hero's
      // #experience/#contact CTAs) by the sticky header's height, so a
      // section's heading doesn't land underneath the 72px header.
      html: {
        scrollPaddingTop: '72px',
      },
      body: {
        bg: 'bg.canvas',
        color: 'text.primary',
      },
      '*:focus-visible': {
        outline: '2px solid',
        outlineColor: 'text.accent',
        outlineOffset: '2px',
      },
      '@media (prefers-reduced-motion: no-preference)': {
        '.hero-line': {
          strokeDasharray: 241,
          strokeDashoffset: 241,
          animation: 'drawLine 0.7s ease-out forwards',
        },
        '.hero-avatar': {
          opacity: 0,
          animation: 'revealPop 0.5s ease-out 0.55s forwards',
        },
        '.hero-tag': {
          opacity: 0,
          animation: 'revealPop 0.4s ease-out forwards',
        },
      },
      '@keyframes drawLine': {
        to: { strokeDashoffset: 0 },
      },
      '@keyframes revealPop': {
        from: { opacity: 0, transform: 'scale(0.85)' },
        to: { opacity: 1, transform: 'scale(1)' },
      },
    },
  },
})

export default theme
