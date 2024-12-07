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
  //  styles: {
  //   global: {
  //     body: {
  //       fontFamily: 'Arial, sans-serif',
  //       margin: 0,
  //       padding: 0,
  //       boxSizing: 'border-box',
  //     },
  //   },
  // },
})

export default theme
