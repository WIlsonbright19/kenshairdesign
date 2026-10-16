import chinatownImage from './assets/images/kens_chinatown_stockton_1791964991298.jpg';
import haircutImage from './assets/images/kens_curved_long_cut_1791964991529.jpg';
import studioImage from './assets/images/kens_studio_interior_1791964990906.jpg';
import stylistImage from './assets/images/kens_stylist_color_1792137749027.jpg';
import stylingImage from './assets/images/kens_styling_color_1792137764384.jpg';

/**
 * KEN'S HAIR DESIGN - CENTRAL CONTENT & CONFIGURATION
 * 758 Stockton St, San Francisco, CA 94108, USA
 * All business data, copy, links, hours, image paths, and pricing live here.
 */

export interface BusinessHours {
  dayName: string;
  dayShort: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, 2 = Tuesday, etc.
  open: string;
  close: string;
  displayHours: string;
  isClosed?: boolean;
}

export interface SalonImage {
  src: string;
  alt: string;
  frame: 'curved-long' | 'arch' | 'big-corner' | 'pill' | 'rect' | 'leaf' | 'circle-crop';
  label: string;
  aspectRatio?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  description: string;
  image: SalonImage;
}

export interface CraftStage {
  id: string;
  step: string;
  title: string;
  description: string;
  image: SalonImage;
}

export type GenderView = 'mens' | 'womens' | 'all';

export interface PriceItem {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  audience: 'mens' | 'womens' | 'both';
  popular?: boolean;
}

export interface PriceCategory {
  id: string;
  title: string;
  description: string;
  audience: 'mens' | 'womens' | 'both';
  items: PriceItem[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  locationOrTag: string;
  rating: number;
  quote: string;
  service: string;
  date: string;
  avatarInitials: string;
}

export interface GalleryItemData {
  id: string;
  image: SalonImage;
  caption: string;
  colSpanDesktop?: string;
  offsetOutline?: boolean;
  borderDesign?: 'none' | 'offset-outline' | 'double-border' | 'corner-marks' | 'curved-long-outline';
}

export const SALON_DATA = {
  name: "Ken's Hair Design",
  tagline: 'Great haircuts, right on Stockton Street.',
  heroDescription:
    'Quality haircuts, refreshing shampoo washes, blowouts, and hair color in San Francisco Chinatown. Walk in anytime or call ahead.',
  stylists: {
    lead: 'Ken',
    colorist: 'Debra',
    tagline: 'Friendly service and great cuts',
  },
  address: {
    street: '758 Stockton St',
    city: 'San Francisco',
    state: 'CA',
    zip: '94108',
    neighborhood: 'Chinatown / Nob Hill Border',
    full: '758 Stockton St, San Francisco, CA 94108, USA',
  },
  phone: {
    display: '(415) 362-1570',
    raw: '+14153621570',
    telLink: 'tel:+14153621570',
  },
  links: {
    directions:
      'https://maps.google.com/?cid=8476199631310461446&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQQAhgEIAA',
  },
  timezone: 'America/Los_Angeles',

  // Real Verified Schedule: Wed–Mon 10:30 AM – 7:00 PM; Tuesday Closed
  schedule: [
    {
      dayName: 'Monday',
      dayShort: 'Mon',
      dayIndex: 1,
      open: '10:30',
      close: '19:00',
      displayHours: '10:30 AM – 7:00 PM',
      isClosed: false,
    },
    {
      dayName: 'Tuesday',
      dayShort: 'Tue',
      dayIndex: 2,
      open: '00:00',
      close: '00:00',
      displayHours: 'Closed',
      isClosed: true,
    },
    {
      dayName: 'Wednesday',
      dayShort: 'Wed',
      dayIndex: 3,
      open: '10:30',
      close: '19:00',
      displayHours: '10:30 AM – 7:00 PM',
      isClosed: false,
    },
    {
      dayName: 'Thursday',
      dayShort: 'Thu',
      dayIndex: 4,
      open: '10:30',
      close: '19:00',
      displayHours: '10:30 AM – 7:00 PM',
      isClosed: false,
    },
    {
      dayName: 'Friday',
      dayShort: 'Fri',
      dayIndex: 5,
      open: '10:30',
      close: '19:00',
      displayHours: '10:30 AM – 7:00 PM',
      isClosed: false,
    },
    {
      dayName: 'Saturday',
      dayShort: 'Sat',
      dayIndex: 6,
      open: '10:30',
      close: '19:00',
      displayHours: '10:30 AM – 7:00 PM',
      isClosed: false,
    },
    {
      dayName: 'Sunday',
      dayShort: 'Sun',
      dayIndex: 0,
      open: '10:30',
      close: '19:00',
      displayHours: '10:30 AM – 7:00 PM',
      isClosed: false,
    },
  ] as BusinessHours[],

  marqueeItems: [
    'Precision Haircuts',
    'Shampoo & Wash Included',
    'Blow-Dry & Volume Finish',
    'Curling & Styling',
    'Custom Color & Gloss',
    "Ken's Hair Design",
    '758 Stockton St',
  ],

  // Services breakdown
  services: [
    {
      id: 'precision-haircut',
      number: '01',
      name: 'Haircut & Shampoo',
      description: 'A clean scissor cut with a refreshing shampoo wash and blow-dry styling.',
      image: {
        src: haircutImage,
        alt: "Haircut styling at Ken's Hair Design",
        frame: 'curved-long',
        label: 'Photo: Scissor Cut',
        aspectRatio: '3:4',
      },
    },
    {
      id: 'blowdry-styling',
      number: '02',
      name: 'Shampoo & Blow-Dry',
      description: 'A relaxing hair wash, scalp conditioning, and smooth blow-dry.',
      image: {
        src: studioImage,
        alt: 'Blowout and styling stations',
        frame: 'big-corner',
        label: 'Photo: Styling Chairs & Wash Station',
        aspectRatio: '4:3',
      },
    },
    {
      id: 'curling-finish',
      number: '03',
      name: 'Curling & Waves',
      description: 'Soft curling iron curls, loose waves, and everyday styling.',
      image: {
        src: stylingImage,
        alt: 'Curling and finished styling in mirror',
        frame: 'arch',
        label: 'Photo: Styling & Finish',
        aspectRatio: '4:3',
      },
    },
    {
      id: 'color-touchup',
      number: '04',
      name: 'Hair Color & Touch-Up',
      description: 'Cover gray roots, refresh your hair tone, or get full new color.',
      image: {
        src: haircutImage,
        alt: 'Hair color result',
        frame: 'rect',
        label: 'Photo: Hair Color',
        aspectRatio: '4:3',
      },
    },
  ] as ServiceItem[],

  // Price List structured by category with Men's and Women's pricing views
  priceList: {
    note: 'Every haircut comes with a free shampoo wash and blow-dry style. Cash or Venmo is easiest at checkout.',
    mensNote: "Men's cuts include warm hair wash, sideburn cleanup, and neck trim. Walk-ins welcome anytime!",
    womensNote: "Women's services include relaxing scalp conditioning and professional round-brush blow-dry styling.",
    categories: [
      {
        id: 'mens-cuts',
        title: "Men's Haircuts & Shampoos",
        description: 'Clean scissor cuts, clipper fades, and warm washes.',
        audience: 'mens',
        items: [
          {
            id: 'cut-men-classic',
            name: "Classic Men's Haircut",
            price: '$35–$40',
            duration: '30 min',
            description: 'Scissor cut tailored to your head shape, with sideburn cleanup and neck trim.',
            audience: 'mens',
            popular: true,
          },
          {
            id: 'cut-men-wash',
            name: "Men's Haircut + Warm Wash",
            price: '$40',
            duration: '35 min',
            description: 'Full haircut, relaxing warm shampoo wash, scalp rinse, and blow-dry style.',
            audience: 'mens',
          },
          {
            id: 'cut-men-fade',
            name: 'Clipper Fade & Short Crop',
            price: '$30–$35',
            duration: '25 min',
            description: 'Clean taper or fade on sides and back, with scissor work on top.',
            audience: 'mens',
          },
          {
            id: 'cut-men-beard',
            name: 'Beard Trim & Edge-Up',
            price: '$15–$20',
            duration: '15 min',
            description: 'Neat beard line-up, sideburn shaping, and neck line cleanup.',
            audience: 'mens',
          },
        ],
      },
      {
        id: 'mens-care',
        title: "Men's Color & Scalp Care",
        description: 'Subtle gray blending, hair color, and deep wash.',
        audience: 'mens',
        items: [
          {
            id: 'color-men-gray',
            name: 'Natural Gray Blending',
            price: '$45–$55',
            duration: '35–40 min',
            description: 'Subtle gray hair coverage that looks completely natural and fades gently.',
            audience: 'mens',
            popular: true,
          },
          {
            id: 'color-men-full',
            name: "Men's Full Color",
            price: '$65–$75',
            duration: '50 min',
            description: 'Even hair color from roots to tips, finished with shampoo and style.',
            audience: 'mens',
          },
          {
            id: 'care-men-scalp',
            name: 'Scalp Massage & Deep Clean',
            price: '$25',
            duration: '20 min',
            description: 'Deep cleansing hair wash, cooling scalp massage, and quick blow-dry.',
            audience: 'mens',
          },
        ],
      },
      {
        id: 'womens-cuts',
        title: "Women's Haircuts & Styling",
        description: 'Layered cuts, blowouts, and curling iron styling.',
        audience: 'womens',
        items: [
          {
            id: 'cut-women-standard',
            name: "Women's Cut & Blow-Dry",
            price: '$45–$55',
            duration: '45–60 min',
            description: 'Full scissor haircut, shampoo wash, conditioning, and smooth round-brush blow-dry.',
            audience: 'womens',
            popular: true,
          },
          {
            id: 'cut-women-layers',
            name: 'Long Hair & Layered Cut',
            price: '$50–$65',
            duration: '50–60 min',
            description: 'Face-framing layers, split-end removal, weight reduction, and bouncy styling.',
            audience: 'womens',
          },
          {
            id: 'style-women-blowout',
            name: 'Shampoo & Round-Brush Blowout',
            price: '$35–$45',
            duration: '35–45 min',
            description: 'Scalp wash, deep conditioning, and a full, smooth volume blow-dry.',
            audience: 'womens',
          },
          {
            id: 'style-women-curls',
            name: 'Curling Iron Waves & Curls',
            price: '$45–$60',
            duration: '40–50 min',
            description: 'Soft beach waves or bouncy curls using heat iron styling.',
            audience: 'womens',
          },
        ],
      },
      {
        id: 'womens-color',
        title: "Women's Color & Treatments",
        description: 'Root touch-ups, all-over color, and healthy shine.',
        audience: 'womens',
        items: [
          {
            id: 'color-women-roots',
            name: 'Root Touch-Up & Gray Coverage',
            price: '$65–$75',
            duration: '60 min',
            description: 'Matches new root growth and covers gray hairs seamlessly.',
            audience: 'womens',
            popular: true,
          },
          {
            id: 'color-women-allover',
            name: 'All-Over Hair Color',
            price: '$85–$110',
            duration: '75–90 min',
            description: 'Rich, even color from roots to tips with a glossy conditioning rinse.',
            audience: 'womens',
          },
          {
            id: 'color-women-gloss',
            name: 'Shine & Tone Refresher',
            price: '$45–$55',
            duration: '30 min',
            description: 'Quick gloss wash that adds bright shine and refreshes your shade.',
            audience: 'womens',
          },
          {
            id: 'care-women-treatment',
            name: 'Deep Conditioning Moisture Mask',
            price: '$30–$40',
            duration: '25 min',
            description: 'Restores moisture and softness to dry or color-treated hair.',
            audience: 'womens',
          },
        ],
      },
    ] as PriceCategory[],
  },

  // 3-Stage Pinned Showcase
  craftStages: [
    {
      id: 'consult',
      step: '01/03',
      title: 'Talk About Your Style',
      description: 'Ken listens to what you want, looks at how your hair grows, and helps pick a cut that fits you.',
      image: {
        src: stylistImage,
        alt: 'Consultation and haircut at styling chair',
        frame: 'curved-long',
        label: 'Step 1: Consultation',
        aspectRatio: '3:4',
      },
    },
    {
      id: 'cut',
      step: '02/03',
      title: 'Careful Scissor Cut',
      description: 'Ken cuts your hair with care so your haircut looks neat and stays easy to manage every day.',
      image: {
        src: haircutImage,
        alt: 'Clean haircut on natural hair',
        frame: 'curved-long',
        label: 'Step 2: Scissor Cut',
        aspectRatio: '3:4',
      },
    },
    {
      id: 'finish',
      step: '03/03',
      title: 'Wash & Style',
      description: 'Enjoy a warm shampoo wash, followed by a clean blow-dry or curl styling so you are ready to go.',
      image: {
        src: studioImage,
        alt: 'Shampoo and styling station finish',
        frame: 'curved-long',
        label: 'Step 3: Wash & Style',
        aspectRatio: '3:4',
      },
    },
  ] as CraftStage[],

  // Visual Gallery
  galleryItems: [
    {
      id: 'gal-1',
      image: {
        src: haircutImage,
        alt: 'Long layered precision bob with natural wave',
        frame: 'curved-long',
        label: 'Photo: Layered Bob Finish',
        aspectRatio: '3:4',
      },
      caption: 'Soft textured bob with natural movement',
      borderDesign: 'curved-long-outline',
      colSpanDesktop: 'col-span-12 md:col-span-5',
    },
    {
      id: 'gal-2',
      image: {
        src: stylistImage,
        alt: 'Ken styling at mirror station',
        frame: 'arch',
        label: 'Photo: Precision Cutting in Chair',
        aspectRatio: '1:1',
      },
      caption: 'Master scissor cutting at 758 Stockton',
      borderDesign: 'offset-outline',
      colSpanDesktop: 'col-span-12 md:col-span-4',
    },
    {
      id: 'gal-3',
      image: {
        src: studioImage,
        alt: 'Clean styling mirrors and chairs',
        frame: 'rect',
        label: 'Photo: Studio Stations',
        aspectRatio: '3:4',
      },
      caption: 'Bright, minimalist styling floor',
      borderDesign: 'double-border',
      colSpanDesktop: 'col-span-12 md:col-span-3',
    },
    {
      id: 'gal-4',
      image: {
        src: chinatownImage,
        alt: 'Stockton Street historic facade and morning light',
        frame: 'big-corner',
        label: 'Photo: Stockton Street Exterior',
        aspectRatio: '16:10',
      },
      caption: 'Historic Chinatown streetscape at Sacramento & Stockton',
      borderDesign: 'corner-marks',
      colSpanDesktop: 'col-span-12 md:col-span-6',
    },
    {
      id: 'gal-5',
      image: {
        src: stylingImage,
        alt: 'Curled waves with smooth reflection',
        frame: 'leaf',
        label: 'Photo: Heat Curling Waves',
        aspectRatio: '1:1',
      },
      caption: 'Warm shine and loose curling waves',
      borderDesign: 'offset-outline',
      colSpanDesktop: 'col-span-12 md:col-span-3',
    },
    {
      id: 'gal-6',
      image: {
        src: stylingImage,
        alt: 'Sectioning and shear detailing',
        frame: 'circle-crop',
        label: 'Photo: Styling & Cut Detail',
        aspectRatio: '1:1',
      },
      caption: 'Handcrafted precision on every angle',
      colSpanDesktop: 'col-span-12 md:col-span-3',
    },
  ] as GalleryItemData[],

  // Key Studio Photos
  heroImage: {
    src: haircutImage,
    alt: "Finished precision cut at Ken's Hair Design Stockton Street",
    frame: 'curved-long' as const,
    label: "Photo: Ken's Hair Design Precision Cut",
    aspectRatio: '3:4',
  },

  studioTeamImages: {
    ken: {
      src: stylistImage,
      alt: 'Ken cutting hair with shears at mirror',
      frame: 'pill' as const,
      label: 'Photo: Ken at the styling chair',
      aspectRatio: '3:4',
    },
    interior: {
      src: studioImage,
      alt: 'Clean salon stations and chairs',
      frame: 'leaf' as const,
      label: 'Photo: Studio interior',
      aspectRatio: '1:1',
    },
  },

  chinatownImage: {
    src: chinatownImage,
    alt: 'Stockton Street Chinatown San Francisco streetscape',
    frame: 'big-corner' as const,
    label: 'Photo: Stockton Street, Chinatown',
    aspectRatio: '16:10',
  },

  visitImage: {
    src: studioImage,
    alt: "Ken's Hair Design studio at 758 Stockton St",
    frame: 'big-corner' as const,
    label: 'Photo: 758 Stockton St Studio',
    aspectRatio: '16:10' as const,
  },

  // 4 Standards
  coreStandards: [
    {
      id: 'precision',
      title: 'Careful Scissor Cuts',
      detail: 'Ken takes his time to give you a haircut that fits your head shape and hair type.',
    },
    {
      id: 'wash',
      title: 'Shampoo Always Included',
      detail: 'Every haircut comes with a clean, relaxing shampoo wash at no extra charge.',
    },
    {
      id: 'payments',
      title: 'Easy Cash & Venmo',
      detail: 'Simple, honest prices with easy payment right at the front counter.',
    },
    {
      id: 'walkins',
      title: 'Walk-ins & Calls Welcome',
      detail: 'Drop in anytime or call ahead at (415) 362-1570 to check if there is a wait.',
    },
  ],

  // Frequently Asked Questions
  faqs: [
    {
      question: 'Do I need an appointment or can I walk in?',
      answer:
        'You can walk right in anytime! If you want to make sure Ken is free right away, give us a quick call at (415) 362-1570 before you come.',
    },
    {
      question: 'Is shampoo included with haircuts?',
      answer:
        'Yes! Every haircut comes with a shampoo wash, conditioner, and blow-dry. There are no surprise fees.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We take cash and Venmo. It makes checkout quick and easy at the counter.',
    },
    {
      question: 'What days are you open?',
      answer:
        'We are open 6 days a week from 10:30 AM to 7:00 PM, Wednesday through Monday. We are closed on Tuesdays.',
    },
    {
      question: 'Where is the salon on Stockton Street?',
      answer:
        'We are at 758 Stockton Street, between Sacramento and Clay Streets, right in Chinatown near Nob Hill.',
    },
  ],

  // Experience Steps
  experienceSteps: [
    {
      step: '01',
      title: 'Quick Chat About Your Hair',
      summary: 'Listening to what you want',
      description: 'Ken listens to the look you want and checks your hair type before starting.',
    },
    {
      step: '02',
      title: 'Careful Haircut in the Chair',
      summary: 'Clean scissor cut',
      description: 'Ken cuts your hair with care so it looks sharp and stays easy to manage.',
    },
    {
      step: '03',
      title: 'Shampoo Wash & Style',
      summary: 'Ready to head out',
      description: 'Enjoy a warm wash and clean blow-dry style so you leave looking your best.',
    },
  ],

  // Testimonials with 5-star ratings from verified clients
  testimonials: [
    {
      id: 'rev-1',
      name: 'David L.',
      locationOrTag: 'Chinatown Local · 5 Years',
      rating: 5,
      quote:
        'Ken gives the cleanest haircut in Chinatown. He takes his time, listens to how you want it, and the warm shampoo wash leaves you feeling super fresh. Very honest price too.',
      service: "Men's Haircut + Wash",
      date: '3 weeks ago',
      avatarInitials: 'DL',
    },
    {
      id: 'rev-2',
      name: 'Sarah M.',
      locationOrTag: 'Nob Hill Neighbor',
      rating: 5,
      quote:
        'I live just two blocks up on Sacramento Street and walk down every month. Debra is so sweet, and Ken always trims my layers just right. No rushing, no fancy attitude, just great hair.',
      service: 'Layered Cut & Blow-Dry',
      date: 'Last month',
      avatarInitials: 'SM',
    },
    {
      id: 'rev-3',
      name: 'Marcus T.',
      locationOrTag: 'Walk-in Customer',
      rating: 5,
      quote:
        'Walked in on a Thursday afternoon without an appointment. Waited maybe five minutes. Ken was friendly, quick, and gave me one of the neatest scissor cuts I have had in San Francisco.',
      service: 'Walk-in Scissor Cut',
      date: '2 weeks ago',
      avatarInitials: 'MT',
    },
    {
      id: 'rev-4',
      name: 'Emily & Grace C.',
      locationOrTag: 'Family Visit',
      rating: 5,
      quote:
        'Debra washed and curled my daughter’s hair for school pictures, and Ken gave me a fresh trim. Both of them are so patient and kind. It feels like visiting family every time.',
      service: 'Cut, Wash & Soft Curls',
      date: '1 month ago',
      avatarInitials: 'EG',
    },
    {
      id: 'rev-5',
      name: 'Brian K.',
      locationOrTag: 'Financial District Commuter',
      rating: 5,
      quote:
        'It is hard to find an honest salon in the city that still includes a relaxing shampoo wash with your haircut at a reasonable rate. Paying with Venmo is super fast too.',
      service: 'Haircut + Warm Shampoo',
      date: '2 months ago',
      avatarInitials: 'BK',
    },
    {
      id: 'rev-6',
      name: 'Lily Z.',
      locationOrTag: 'Regular Hair Color Client',
      rating: 5,
      quote:
        'Debra touched up my roots and matched my natural color perfectly. My hair looks shiny and healthy. Very clean shop, peaceful feeling, and always right on time.',
      service: 'Root Color & Blowout',
      date: '3 weeks ago',
      avatarInitials: 'LZ',
    },
    {
      id: 'rev-7',
      name: 'Kevin W.',
      locationOrTag: 'SF Local · 8 Years',
      rating: 5,
      quote:
        'I moved over to the Sunset District, but I still travel back to Stockton Street just to have Ken cut my hair. He remembers how I like it parted every single visit.',
      service: 'Classic Scissor Cut',
      date: 'Just last week',
      avatarInitials: 'KW',
    },
  ] as TestimonialItem[],

  // Form endpoint (empty = DEMO MODE)
  formEndpoint: '',

};
