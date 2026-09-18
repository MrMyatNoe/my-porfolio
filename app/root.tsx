import styles from '~/styles/global.css'

import { Box, ChakraProvider } from '@chakra-ui/react'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import theme from './theme'

import type { MetaFunction } from '@remix-run/node'
export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Thet Myat Noe',
  viewport: 'width=device-width,initial-scale=1',
})
export const links = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap',
  },
  { rel: 'stylesheet', href: styles },
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider theme={theme}>
          <Box
            as="a"
            href="#main-content"
            position="absolute"
            left="-9999px"
            top="auto"
            zIndex={2000}
            bg="text.accent"
            color="bg.canvas"
            px={4}
            py={2}
            borderRadius="6px"
            fontSize="14px"
            fontWeight="600"
            _focus={{ left: '16px', top: '16px' }}
          >
            Skip to content
          </Box>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </ChakraProvider>
      </body>
    </html>
  )
}
