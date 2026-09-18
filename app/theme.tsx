import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body: "'IBM Plex Sans', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
  semanticTokens: {
    colors: {
      'bg.canvas': { default: '#F5F7F8', _dark: '#0F1720' },
      'bg.surface': { default: '#FFFFFF', _dark: '#16212C' },
      'bg.surfaceRaised': { default: '#EEF2F3', _dark: '#1C2A36' },
      'border.default': { default: '#DCE3E7', _dark: '#25333F' },
      'text.primary': { default: '#132029', _dark: '#E7EDF0' },
      'text.secondary': { default: '#51636D', _dark: '#93A5B1' },
      'text.accent': { default: '#0E8074', _dark: '#2FB8AE' },
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
