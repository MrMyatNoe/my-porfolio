import { extendTheme, theme as defaultTheme } from '@chakra-ui/react'

const theme = extendTheme({
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
  },
  fonts: {
    heading: "'IBM Plex Sans', sans-serif;",
    body: "'IBM Plex Sans', sans-serif;",
  },
})

export default theme
