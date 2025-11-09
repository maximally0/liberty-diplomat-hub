export interface MUN {
  id: string;
  name: string;
  host: string;
  format: 'online' | 'offline' | 'hybrid';
  startDate: string;
  endDate: string;
  location: string;
  city: string;
  region: string;
  description: string;
  logo: string;
  isFeatured: boolean;
  isFree: boolean;
  tags: string[];
  committees: Committee[];
  registrationOpen: boolean;
}

export interface Committee {
  id: string;
  name: string;
  agenda: string;
  chairs: Chair[];
  capacity: number;
  filled: number;
  backgroundGuideUrl: string;
}

export interface Chair {
  id: string;
  name: string;
  photo: string;
  experience: string;
}

export interface Delegate {
  id: string;
  name: string;
  email: string;
  institution: string;
  country: string;
  committee: string;
  photo: string;
  status: 'pending' | 'confirmed' | 'rejected';
  munId: string;
}

export interface Award {
  type: 'Best Delegate' | 'Outstanding Delegate' | 'High Commendation' | 'Special Mention';
  delegateName: string;
  committee: string;
  country: string;
}

export const mockMUNs: MUN[] = [
  {
    id: '1',
    name: 'Global Youth Summit MUN 2025',
    host: 'International Youth Foundation',
    format: 'online',
    startDate: '2025-03-15',
    endDate: '2025-03-17',
    location: 'Virtual',
    city: 'Online',
    region: 'Global',
    description: 'Join delegates from over 50 countries in discussing pressing global issues including climate action, digital rights, and sustainable development.',
    logo: '🌐',
    isFeatured: true,
    isFree: true,
    tags: ['Climate Action', 'Digital Rights', 'Beginner Friendly'],
    registrationOpen: true,
    committees: [
      {
        id: 'c1',
        name: 'United Nations Security Council',
        agenda: 'Addressing Cybersecurity Threats in the Modern Age',
        chairs: [
          { id: 'ch1', name: 'Sarah Chen', photo: '👩', experience: '5 years' },
          { id: 'ch2', name: 'Marcus Johnson', photo: '👨', experience: '4 years' }
        ],
        capacity: 15,
        filled: 12,
        backgroundGuideUrl: '#'
      }
    ]
  },
  {
    id: '2',
    name: 'Oxford International MUN',
    host: 'Oxford University',
    format: 'offline',
    startDate: '2025-04-20',
    endDate: '2025-04-23',
    location: 'Oxford Union, Oxford, UK',
    city: 'Oxford',
    region: 'Europe',
    description: 'Experience diplomacy at one of the world\'s most prestigious universities. Four days of intense debate, networking, and professional development.',
    logo: '🎓',
    isFeatured: true,
    isFree: false,
    tags: ['Advanced', 'Crisis Committee', 'Networking'],
    registrationOpen: true,
    committees: [
      {
        id: 'c2',
        name: 'Historical Security Council 1962',
        agenda: 'Cuban Missile Crisis',
        chairs: [
          { id: 'ch3', name: 'Emma Watson', photo: '👩', experience: '6 years' }
        ],
        capacity: 15,
        filled: 15,
        backgroundGuideUrl: '#'
      }
    ]
  },
  {
    id: '3',
    name: 'Singapore Youth MUN',
    host: 'National University of Singapore',
    format: 'hybrid',
    startDate: '2025-05-10',
    endDate: '2025-05-12',
    location: 'NUS Campus, Singapore',
    city: 'Singapore',
    region: 'Asia',
    description: 'Hybrid format allowing both in-person and virtual participation. Focus on Asia-Pacific regional issues and sustainable development.',
    logo: '🦁',
    isFeatured: true,
    isFree: false,
    tags: ['Regional Focus', 'Sustainability', 'Hybrid'],
    registrationOpen: true,
    committees: []
  },
  {
    id: '4',
    name: 'Harvard WorldMUN',
    host: 'Harvard University',
    format: 'offline',
    startDate: '2025-03-25',
    endDate: '2025-03-29',
    location: 'Panama City, Panama',
    city: 'Panama City',
    region: 'Americas',
    description: 'The world\'s most international MUN conference, bringing together students from over 70 countries for five days of debate and cultural exchange.',
    logo: '🗽',
    isFeatured: false,
    isFree: false,
    tags: ['International', 'Advanced', 'Cultural Exchange'],
    registrationOpen: true,
    committees: []
  },
  {
    id: '5',
    name: 'Berlin Crisis MUN',
    host: 'Humboldt University',
    format: 'offline',
    startDate: '2025-06-05',
    endDate: '2025-06-07',
    location: 'Berlin, Germany',
    city: 'Berlin',
    region: 'Europe',
    description: 'Specialized crisis committee focused on fast-paced, dynamic simulations. Perfect for experienced delegates seeking high-stakes scenarios.',
    logo: '🏛️',
    isFeatured: false,
    isFree: false,
    tags: ['Crisis', 'Advanced', 'Fast-Paced'],
    registrationOpen: true,
    committees: []
  },
  {
    id: '6',
    name: 'Dubai International Schools MUN',
    host: 'Dubai International Academy',
    format: 'offline',
    startDate: '2025-02-28',
    endDate: '2025-03-02',
    location: 'Dubai, UAE',
    city: 'Dubai',
    region: 'Middle East',
    description: 'Beginner-friendly MUN with comprehensive training workshops. Open to high school students across the Gulf region.',
    logo: '🏙️',
    isFeatured: false,
    isFree: true,
    tags: ['Beginner Friendly', 'Training', 'Regional'],
    registrationOpen: true,
    committees: []
  },
  {
    id: '7',
    name: 'Climate Action Virtual Summit',
    host: 'UN Youth',
    format: 'online',
    startDate: '2025-04-22',
    endDate: '2025-04-22',
    location: 'Virtual',
    city: 'Online',
    region: 'Global',
    description: 'One-day intensive online MUN focused exclusively on climate change and environmental policy. Free for all participants.',
    logo: '🌱',
    isFeatured: true,
    isFree: true,
    tags: ['Climate', 'One Day', 'Free'],
    registrationOpen: true,
    committees: []
  },
  {
    id: '8',
    name: 'Stanford MUN Conference',
    host: 'Stanford University',
    format: 'offline',
    startDate: '2025-05-15',
    endDate: '2025-05-18',
    location: 'Stanford, California, USA',
    city: 'Stanford',
    region: 'Americas',
    description: 'West Coast\'s premier collegiate MUN conference with innovative committee formats and professional development workshops.',
    logo: '🌉',
    isFeatured: false,
    isFree: false,
    tags: ['Collegiate', 'Innovation', 'Professional'],
    registrationOpen: true,
    committees: []
  }
];

export const mockDelegates: Delegate[] = [
  {
    id: 'd1',
    name: 'Alex Rivera',
    email: 'alex@example.com',
    institution: 'Cambridge International School',
    country: 'United Kingdom',
    committee: 'UNSC',
    photo: '👤',
    status: 'confirmed',
    munId: '1'
  },
  {
    id: 'd2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    institution: 'Delhi Public School',
    country: 'India',
    committee: 'UNSC',
    photo: '👤',
    status: 'confirmed',
    munId: '1'
  }
];

export const mockStats = {
  totalMUNs: 847,
  totalDelegates: 45230,
  totalInstitutions: 312,
  countriesRepresented: 78
};
