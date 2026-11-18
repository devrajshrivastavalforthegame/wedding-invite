export interface WeddingEvent {
  id: string
  title: string
  subtitle?: string
  date: string
  time: string
  venue: string
  mapUrl?: string
  image?: string
  icon: 'mehendi' | 'music' | 'haldi' | 'wedding' | 'bidaai'
}

export interface FamilySide {
  side: 'bride' | 'groom'
  title: string
  surname: string
  blessingsFrom: string
  parents: string
  parentDesignation?: string
  familyNote: string
}

export interface RSVPContact {
  name: string
  relation: string
  phone: string
  phoneClean: string
  role: string
}

export const wedding = {
  bride: 'Isha',
  groom: 'Yatharth',
  weddingDate: '12 December 2026',
  displayDate: '12 December 2026',
  venue: 'Shangri-La Palace',
  location: 'Patna, Bihar, India',

  targetDate: {
    iso: '2026-12-12T19:30:00+05:30',
    display: '12 December 2026, 7:30 PM IST',
    timezone: 'Asia/Kolkata',
  },

  introduction: {
    invocation: 'श्री गणेशाय नमः',
    heading: 'Together with their families',
    message:
      'With hearts full of love and gratitude, we invite you to celebrate our wedding and begin a new chapter of our lives together.',
  },

  welcome: {
    title: 'A New Chapter Begins',
    message:
      'With the blessings of our families, we invite you to join us as we celebrate the beautiful union of Isha and Yatharth. Your presence will make these moments even more special.',
  },

  // Family Lineage & Blessings
  families: {
    sectionTitle: 'With Blessings from Families',
    sectionSubtitle: 'A union nurtured by love, traditions, and family elders',
    bride: {
      side: 'bride' as const,
      title: "Bride's Family",
      surname: 'Shrivastava Family',
      blessingsFrom: 'With the divine blessings of our beloved Grandparents',
      parents:
        'Daughter of Smt. Babita & Shri Rajendra Kumar Shrivastava',
      parentDesignation:
        '(Raja) Member of MPCCI & National Secretary of Akhil Bharitye Kayastha Mahasabha',
      familyNote:
        'Warmly inviting you to celebrate the joyous occasion with the entire Shrivastava family and relatives.',
    },
    groom: {
      side: 'groom' as const,
      title: "Groom's Family",
      surname: 'Vats Family',
      blessingsFrom: 'With the divine blessings of our beloved Grandparents',
      parents: 'Son of Smt. Deepti & Shri Shyam Vats',
      familyNote:
        'Looking forward to welcoming you with warmth, affection, and folded hands.',
    },
  },

  // RSVP & Hospitality
  rsvp: {
    title: 'R. S. V. P.',
    subtitle: 'With Warm Compliments',
    note: 'Your presence and blessings are our greatest gift. For any assistance with travel, accommodation, or itinerary in Patna, please contact our family members:',
    contacts: [
      {
        name: 'Devraj Shrivastava',
        relation: "Bride's Family",
        role: 'Hospitality & Guest Assistance',
        phone: '+91 78692 22615',
        phoneClean: '917869222615',
      },
      {
        name: 'Family Wedding Desk',
        relation: 'Patna Coordination',
        role: 'Venue & Stay Logistics',
        phone: '+91 94251 22615',
        phoneClean: '919425122615',
      },
    ] as RSVPContact[],
    advice:
      'Kindly let us know your arrival details by 25 November 2026 to ensure a comfortable stay.',
  },

  closing: {
    heading: "We Can't Wait to Celebrate With You",
    message:
      'As we begin this beautiful journey together, we look forward to sharing our happiness, laughter and memories with you.',
    dateDisplay: '12 · 12 · 2026',
  },

  events: [
    {
      id: 'lagun-mehendi',
      title: 'LAGUN & MEHENDI BHAAT',
      subtitle: 'Celebration of Colour & Henna',
      date: '7 December 2026',
      time: '6:00 PM onwards',
      venue: 'Details to be announced.',
      image: '',
      icon: 'mehendi',
    },
    {
      id: 'mandap-tilak-sangeet',
      title: 'MANDAP, TILAK & SANGEET',
      subtitle: 'Hi-Tea & Dinner',
      date: '11 December 2026',
      time: '5:00 PM onwards',
      venue: 'Cafe Hideout',
      mapUrl: 'https://maps.app.goo.gl/9cpziZX4G2KRvQtb7',
      image: '/images/cafe-hideout.png',
      icon: 'music',
    },
    {
      id: 'haldi',
      title: 'HALDI',
      subtitle: 'A Splash of Yellow & Joy',
      date: '12 December 2026',
      time: '11:00 AM – 2:00 PM',
      venue: 'Shangri-La Palace',
      mapUrl: 'https://maps.app.goo.gl/cURNsah1cQwL1Kqp9',
      image: '/images/shangri-la-palace.png',
      icon: 'haldi',
    },
    {
      id: 'wedding-ceremony',
      title: 'WEDDING CEREMONY',
      subtitle: 'Pheras & Auspicious Vows',
      date: '12 December 2026',
      time: '7:30 PM onwards',
      venue: 'Shangri-La Palace',
      mapUrl: 'https://maps.app.goo.gl/cURNsah1cQwL1Kqp9',
      image: '/images/shangri-la-palace.png',
      icon: 'wedding',
    },
    {
      id: 'bidaai',
      title: 'BIDAAI',
      subtitle: 'Blessings for the New Journey',
      date: '13 December 2026',
      time: '8:00 AM',
      venue: 'Shangri-La Palace',
      mapUrl: 'https://maps.app.goo.gl/cURNsah1cQwL1Kqp9',
      image: '/images/shangri-la-palace.png',
      icon: 'bidaai',
    },
  ] as WeddingEvent[],
}
