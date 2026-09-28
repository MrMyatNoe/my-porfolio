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
    role: 'Senior Backend Developer',
    date: 'July 2022 - Present',
    bullets: [
      'Backend Developer on the LCUWWB insurance platform project, working within a microservices architecture built with Spring Boot and Kafka',
      "Wrote and maintained contract tests and Playwright tests as part of the team's testing practice",
      'Worked within automated DevSecOps pipelines using GitHub Actions, following Agile methodology',
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
      'Built a fullstack mobile and web application as the sole fullstack developer, product owner, and designer',
      'Built the mobile app in Flutter with Firebase and AdMob, and the web app in Next.js with Chakra UI',
      'Automated builds and releases with GitHub Actions',
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
      'Frontend Developer on the IHRP blog project',
      'Built the frontend in Next.js and Chakra UI, with GraphQL for data and attention to UI/UX',
      'Worked as an independent freelance contractor',
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
      'Built the e-commerce platform across backend, frontend, and full-stack work as it moved through development phases',
      'Worked with Spring Boot/Hibernate, then NestJS/Prisma, and Remix/Chakra UI across the platform\'s stack',
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
