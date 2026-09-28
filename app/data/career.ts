export interface Milestone {
  id: number
  hash: string
  current?: boolean
  company: string
  role: string
  date: string
  bullets: string[]
  badges: string[]
}

export const milestones: Milestone[] = [
  {
    id: 1,
    hash: 'a3f9c2',
    current: true,
    company: 'Allianz Technology Thailand',
    role: 'Backend Developer / Architect Focus',
    date: 'July 2022 - Present',
    bullets: [
      'Architected and implemented high-throughput microservices within an event-driven architecture using Spring Boot and Kafka',
      'Led system design and integration of Kafka message brokers to handle high-volume data streaming for underwriting engines',
      'Established automated DevSecOps pipelines via GitHub Actions using contract and Playwright testing',
    ],
    badges: ['Java', 'Spring Boot', 'Kafka', 'Microservices'],
  },
  {
    id: 2,
    hash: '4b8fd1',
    company: 'Personal Project',
    role: 'Fullstack Developer, Product Owner & Designer',
    date: 'December 2021 - Present',
    bullets: [
      'Built and shipped a Flutter mobile app with a companion Next.js/Chakra UI admin console, backed by Firebase for auth, data, and real-time sync',
      'Owned the full product lifecycle solo — design, development, and AdMob monetization',
      'Automated build and release checks with GitHub Actions',
    ],
    badges: ['Flutter', 'Firebase', 'Next.js', 'Chakra UI'],
  },
  {
    id: 3,
    hash: 'c291e4',
    company: 'IHRP',
    role: 'Freelance Frontend Developer',
    date: 'December 2021 - January 2022',
    bullets: [
      'Built the blog frontend in Next.js and Chakra UI, consuming a GraphQL API for content',
      'Delivered the engagement independently as a freelance contractor on a fixed scope',
    ],
    badges: ['Next.js', 'Chakra UI', 'GraphQL', 'Freelance'],
  },
  {
    id: 4,
    hash: '7e12b8',
    company: 'Nanyan Platform, Myanmar',
    role: 'Fullstack Developer',
    date: 'October 2020 - April 2022',
    bullets: [
      'Carried a multi-phase e-commerce and retail platform through four stack iterations — Spring Boot/Hibernate, then NestJS/Prisma, then a Remix + Chakra UI frontend',
      "Worked across backend, frontend, and full-stack roles as the platform's needs shifted phase to phase",
      'Mentored junior developers and helped establish database-modeling and API-integration practices',
    ],
    badges: ['Spring Boot', 'NestJS', 'Prisma', 'Remix'],
  },
  {
    id: 5,
    hash: 'd6a058',
    company: 'MBC Software Development, Myanmar',
    role: 'Fullstack Developer',
    date: 'June 2018 - December 2020',
    bullets: [
      'Built and maintained POS, retail, accounting, and clinic management systems in Java, GWT, and Spring Boot',
      "Shipped two mobile applications (Clinic App, Privilege App) as part of the platform's mobile expansion",
      'Wrote stored procedures and Jasper reports for operational reporting',
    ],
    badges: ['Java', 'Spring Boot', 'GWT', 'MSSQL'],
  },
  {
    id: 6,
    hash: '9f3c71',
    company: 'FPT Software, Myanmar',
    role: 'Junior Java Developer',
    date: 'March 2017 - August 2017',
    bullets: [
      'Added features to and maintained an existing J2EE framework-based application',
      'Worked with Oracle Database for data persistence in a production maintenance role',
    ],
    badges: ['Java', 'J2EE', 'Oracle DB'],
  },
]
