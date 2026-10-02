import { Box } from '@chakra-ui/react'

const CONNECTOR_ENDPOINTS: Array<[number, number]> = [
  [70, 70],
  [410, 70],
  [70, 410],
  [410, 410],
  [240, 70],
  [410, 240],
  [240, 410],
  [70, 240],
]

// Edge tags are centered with calc() rather than transform, because the reveal animation owns `transform`.
const CENTER_X = { base: 'calc(50% - 42px)', lg: 'calc(50% - 66px)' }
const CENTER_Y = { base: 'calc(50% - 12px)', lg: 'calc(50% - 20px)' }

const SIDE_INSET = { base: '2px', lg: '4px' }
const EDGE_INSET = { base: '28px', lg: '50px' }

// Corners are technologies; edges are architecture concepts.
const TAGS = [
  {
    label: 'spring-boot',
    accent: 'text.accent',
    pos: { left: SIDE_INSET, top: EDGE_INSET },
  },
  {
    label: 'next.js',
    accent: 'text.accentPurple',
    pos: { right: SIDE_INSET, top: EDGE_INSET },
  },
  {
    label: 'kubernetes',
    accent: 'text.accent',
    pos: { left: SIDE_INSET, bottom: EDGE_INSET },
  },
  {
    label: 'aws',
    accent: 'text.accentPurple',
    pos: { right: SIDE_INSET, bottom: EDGE_INSET },
  },
  {
    label: 'system-design',
    accent: 'text.accentPurple',
    pos: { left: CENTER_X, top: EDGE_INSET },
  },
  {
    label: 'event-driven',
    accent: 'text.accent',
    pos: { right: SIDE_INSET, top: CENTER_Y },
  },
  {
    label: 'api-design',
    accent: 'text.accent',
    pos: { left: CENTER_X, bottom: EDGE_INSET },
  },
  {
    label: 'microservices',
    accent: 'text.accentPurple',
    pos: { left: SIDE_INSET, top: CENTER_Y },
  },
] as const

const tagStyle = {
  w: { base: '84px', lg: '132px' },
  h: { base: '24px', lg: '40px' },
  borderRadius: { base: '12px', lg: '20px' },
  border: '1px solid',
  bg: 'bg.surface',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'mono',
  fontSize: { base: '9px', lg: '12px' },
} as const

export function HeroDiagram({ name }: { name: string }) {
  return (
    <Box
      position="relative"
      w={{ base: '280px', lg: '480px' }}
      h={{ base: '280px', lg: '480px' }}
      flexShrink={0}
      mx="auto"
      data-testid="hero-diagram"
    >
      <Box
        as="svg"
        position="absolute"
        inset={0}
        viewBox="0 0 480 480"
        w="100%"
        h="100%"
      >
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

      {TAGS.map(({ label, accent, pos }, index) => (
        <Box
          key={label}
          className="hero-tag"
          style={{ animationDelay: `${0.2 + index * 0.12}s` }}
          position="absolute"
          {...pos}
          {...tagStyle}
          borderColor={accent}
          color={accent}
        >
          {label}
        </Box>
      ))}
    </Box>
  )
}
