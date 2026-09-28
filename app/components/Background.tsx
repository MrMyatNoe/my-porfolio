import { Box } from '@chakra-ui/react'

export function Background() {
  return (
    <Box
      data-testid="ambient-background"
      aria-hidden="true"
      position="fixed"
      inset={0}
      zIndex={-1}
      pointerEvents="none"
      sx={{
        backgroundImage: [
          'radial-gradient(ellipse 900px 500px at 15% -10%, rgba(45,212,191,0.10), transparent 60%)',
          'radial-gradient(ellipse 700px 500px at 90% 10%, rgba(179,157,255,0.08), transparent 60%)',
          'radial-gradient(rgba(140,160,184,0.10) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: 'auto, auto, 26px 26px',
      }}
    />
  )
}
