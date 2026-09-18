import { Box } from '@chakra-ui/react'

const CONNECTOR_ENDPOINTS: Array<[number, number]> = [
  [70, 70],
  [410, 70],
  [70, 410],
  [410, 410],
]

const tagStyle = {
  w: { base: '76px', lg: '132px' },
  h: { base: '24px', lg: '40px' },
  borderRadius: { base: '12px', lg: '20px' },
  border: '1px solid',
  borderColor: 'border.default',
  bg: 'bg.surface',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'mono',
  fontSize: { base: '9px', lg: '12px' },
  color: 'text.secondary',
} as const

export function HeroDiagram({ name }: { name: string }) {
  return (
    <Box position="relative" w={{ base: '280px', lg: '480px' }} h={{ base: '280px', lg: '480px' }} flexShrink={0} mx="auto">
      <Box as="svg" position="absolute" inset={0} viewBox="0 0 480 480" w="100%" h="100%">
        {CONNECTOR_ENDPOINTS.map(([x, y], index) => (
          <Box
            as="line"
            key={`${x}-${y}`}
            className="hero-line"
            style={{ animationDelay: `${0.05 + index * 0.12}s` }}
            x1={240}
            y1={240}
            x2={x}
            y2={y}
            stroke="var(--chakra-colors-border-default)"
            strokeWidth={1}
          />
        ))}
      </Box>

      <Box
        as="img"
        src="/pp.jpg"
        alt={name}
        className="hero-avatar"
        position="absolute"
        left={{ base: '103px', lg: '176px' }}
        top={{ base: '103px', lg: '176px' }}
        w={{ base: '74px', lg: '128px' }}
        h={{ base: '74px', lg: '128px' }}
        borderRadius="full"
        objectFit="cover"
        border="2px solid"
        borderColor="text.accent"
      />

      <Box className="hero-tag" style={{ animationDelay: '0.2s' }} position="absolute" left={{ base: '2px', lg: '4px' }} top={{ base: '28px', lg: '50px' }} {...tagStyle}>
        spring-boot
      </Box>
      <Box className="hero-tag" style={{ animationDelay: '0.32s' }} position="absolute" right={{ base: '2px', lg: '4px' }} top={{ base: '28px', lg: '50px' }} {...tagStyle}>
        kafka
      </Box>
      <Box className="hero-tag" style={{ animationDelay: '0.44s' }} position="absolute" left={{ base: '2px', lg: '4px' }} bottom={{ base: '28px', lg: '50px' }} {...tagStyle}>
        postgres
      </Box>
      <Box className="hero-tag" style={{ animationDelay: '0.56s' }} position="absolute" right={{ base: '2px', lg: '4px' }} bottom={{ base: '28px', lg: '50px' }} {...tagStyle}>
        rest-api
      </Box>
    </Box>
  )
}
