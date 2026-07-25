import { DreamItem, BookItem, SisterLibraryItem, ReflectionItem } from '../types';

export const DREAM_ITEMS: DreamItem[] = [
  {
    id: 'nakshi-kantha',
    title: 'Moon Granny Nakshi Kantha',
    category: 'Textile Art',
    description: 'Hand-embroidered story prompt for inspiring dialogue and creation',
    fullNarrative: `The Moon Granny Nakshi Kantha project revives traditional Bengali textile art as a living canvas for intergenerational storytelling. Artisans from rural Bangladesh collaborate with young urban writers to stitch folk legends, celestial myths, and personal memories directly onto organic cotton quilts.

Each motif sewn into the kantha quilt represents a story fragment—a grandmother's song, a flood survival memory, or a dream of female liberation. During community circles, participants trace the stitched lines with their fingers, using the embroidered symbols as prompts to share untold personal histories.`,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWSLLZ5ND5L4YhpyS9K_b55aON6fJkt-FiNDKvJthX0KV-zZz_IwC_qCZtXJEZOPhuC1Q0CykA2RaTbIe8LtPhPnI6rnNWO1G7OgNyDIViwXZAi7ua9qC5Un2FKtf9LNigipiLs0X0VkYOkH4a74rAkDnWphy3hQtEedzlSn3mc5_hs6zPrD1JoIfVUl-QuV-sgXniIOOTtYFrogIKJSAsryihQRFz_s_P4aqA706sZN782L40MosMGRrvo0fO_zXBysqGVdR-1ibd',
    bgAccent: 'bg-[#C1ACD6]/20',
    year: '2023 - Present',
    location: 'Dhaka & Jessore, Bangladesh',
    impactMetrics: '48 Textile Artisans • 1,200 Workshop Participants',
    tags: ['Embroidery', 'Textile Lore', 'Heritage Preservation', 'Folk Art'],
    quote: '"Stitching is memory made tangible; every knot holds a secret passed down through generations of women."'
  },
  {
    id: 'ladyland-2026',
    title: 'Project Ladyland 2026',
    category: 'Theatre & Performance',
    description: 'Imagining futures through theatre',
    fullNarrative: `Project Ladyland 2026 is a major participatory performance and research initiative funded by the British Council and Women of the World (WOW) Foundation. Inspired by Begum Rokeya Sakhawat Hosein's visionary 1905 feminist science fiction story "Sultana's Dream", this programme reimagines a utopian world called Ladyland—where women govern in harmony, science harnesses solar energy and cloud rain collectors, and peace replaces militarized conflict.

Through immersive soundscapes, digital light projections, and collaborative ensemble theatre, participants explore what a contemporary "Ladyland" looks like in 2026, centering climate justice, non-violent technology, and shared feminist leadership.`,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU4aZVt8vA20tP37J-b_8mCNyQemm0TIsZ_beAvnCdRQ9xIwso-g47rLiHSKhHrR_cccEpSKvC4BRlVdubuM-t2q7pUJvge_1703GZuQmpY-mhU3bnKRO5ZJc1RTtqT00H0xCtwa_lyhV0NageMwgdLhka5lUDr431BNone2mfbLxCi2R_3wo6dXDkW_bYQRsRJatnQN55-zhumt75ThY9sMwFjUCw7WTBsH7w3ALH9Hs_C7ULgXmU9fOCrdI_np_JB8l7UjEPRZvf',
    bgAccent: 'bg-[#BAD687]/20',
    year: '2024 - 2026',
    location: 'Global / Dhaka / London',
    impactMetrics: 'WOW Foundation Grantee • 35 Ensemble Performers • 4 Country Tours',
    tags: ['Sci-Fi', 'Rokeya Sakhawat Hosein', 'Feminist Utopias', 'Theatre'],
    quote: '"In Ladyland, we do not conquer nature; we listen to her, and let solar heat cook our grain without smoke."'
  },
  {
    id: 'sister-library',
    title: 'Sister Library',
    category: 'Community Space',
    description: 'Porous community of readers and makers celebrating female creativity',
    fullNarrative: `The Sister Library is an evolving, community-built reading room and archive devoted entirely to works by female, non-binary, and gender-marginalized authors and zine-makers. Designed as a living "porous library", it moves between physical pop-ups, mobile book carts, and digital lending networks.

Visitors gather to browse rare self-published zines, attend silent reading circles, and participate in bookbinding workshops. It serves as both a haven for quiet reflection and a vibrant incubator for new grassroots literature.`,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiCCwb5hw25jEf7BCsnm3RfOWmlf3ulD00HGoBu8sZms4EBZ9ZS16eo20kn52ci6Y4YSte-T9Vf0FtmdcfapZ1yoab_6MVKqvThPEaYbAGiYu0hiqTmKi54e9PsFSlg-g29XYe48oz0P1z-wVcTtCzHNdqfvbDgNIjX8_8jlNP4VaDFsI25gtVk_YNoKoUQ6Bz3Ej5_J4FdNia3ralYmEZxJqvOXMmjSmLrFP5xrtn6tt8LUDkjAOvxl-cpmY0cvT2eBuoEO5ShshA',
    bgAccent: 'bg-[#C1ACD6]/20',
    year: '2019 - Present',
    location: 'Dhaka Sister Room & Mobile Carts',
    impactMetrics: '2,800+ Books & Zines • 5,000+ Regular Readers',
    tags: ['Library', 'Feminist Texts', 'Zines', 'Community'],
    quote: '"A library is not a silent museum; it is a warm kitchen where ideas are cooked and shared."'
  },
  {
    id: 'myth-bridge',
    title: 'The Myth Bridge',
    category: 'Fairy Tale & Lore',
    description: 'Cross-cultural fairy tale mash-up',
    fullNarrative: `The Myth Bridge bridges South Asian folklore with global indigenous mythologies. Through collaborative storytelling labs, writers and visual artists re-examine ancient archetypes—from the resilient Chander Buri (Moon Granny) to indigenous river guardians—recasting them into modern graphic stories for young adults.

By dismantling colonial story structures, The Myth Bridge empowers young writers to find heroism in communal wisdom, environmental stewardship, and quiet acts of empathy.`,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBykIE3CulT7z-f5gSh1nAd9kuIzrYnNuRwca0qX0ebaVULo-uWCQgfIAR2p4y6Pg0b5IErKGij2fkspEW-oRe162nVpijn-DzabMZ_1GhcnsEkL53kS9fyEroOJLXLDnvjuFv1mrJtXDioFZY6f0HDHUa5bVA18pwzYULIujSL3DnXQ-CotpBkZSU9sYjIhsKJNSYBbROzG8liXokq4u8kvbC-57D-R7iiFMv4US9i4YlxQDkOnTwRNa6PhRY4b3xBtTBUpXidMlqw',
    bgAccent: 'bg-[#D64E0E]/20',
    year: '2022 - Present',
    location: 'South Asia & Global',
    impactMetrics: '12 Graphic Short Stories • 8 Youth Writing Residencies',
    tags: ['Mythology', 'Graphic Novel', 'Youth Lore', 'Cross-Cultural'],
    quote: '"Myths are bridges between who we were and the worlds we dare to invent."'
  }
];

export const BOOK_ITEMS: BookItem[] = [
  {
    id: 'herstories-1',
    title: 'HerStories: Extraordinary Women of Bengal',
    author: 'HerStory Editorial Team',
    illustrator: 'Various Young Female Illustrators',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhZNjpUZkvNNoESSRaFoGSXx7DOZgLmuOIxvz-JWlF2jghqjm9CDozY-ue-zl4mzlTwwMQm3jzgJabnI1xbK1VskaJZodz6m8i8O0G1cMs3YLdHQMNZ3aWgol5e1MX7sfRnwNh3TxQ9C4UPKhMWDSbSwAK9geBSSZOEyOoFoBvEYt_hnEwfTuhJADfOLEjeU0iIn38bLFHhN5zOJI2U2yFtR-gp5sPTGjMDq2rW7UoPecIQpM3W6L1XPODVWqUVCaUj4wkEAIQaBBs',
    description: 'An illustrated anthology celebrating pioneer women—from scientists, freedom fighters, and poets to environmental defenders whose contributions shaped history.',
    year: '2020',
    pages: 180,
    genre: 'Illustrated Biography',
    price: '$18.00 / ৳1,200',
    excerptText: 'In the quiet shadows of colonial Bengal, Begum Rokeya picked up her pen not just to write, but to build schools where girls could look up at the stars and claim the cosmos as their birthright...',
    downloadablePdf: true
  },
  {
    id: 'sultanas-dream-annotated',
    title: 'Sultana\'s Dream: Centenary Edition',
    author: 'Rokeya Sakhawat Hosein',
    illustrator: 'Nakshi Kantha Collective',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3AdXCBnNP1PxM57H4Drd7yukTHziz2-AxqwUPWPkREBPvNZPdHDiZKWjT5yyFzvVcA1fYv7ZFaF_jM78_IVhL5ma-soEKs68MnkvRfFIDYXB4wHhv_wJkrMl3C6PoupNLHGZEgho4YKFHV5NYJNVnVXTe1rjzmcP3pGB0o4H8Q2HX6mDWylK6JyDK1y90Pf1qLYBpiWsp5brEP7f21ncEogNvbVXY082UnRX4w1zRCMJ1dOiOhgS03ZRm-4Sr36rFRU1tLArYAww5',
    description: 'The landmark 1905 feminist science fiction novella, reproduced with essay commentaries, historical artwork, and original manuscripts.',
    year: '2021',
    pages: 120,
    genre: 'Sci-Fi Classic',
    price: '$15.00 / ৳950',
    excerptText: '"\'Where are the men?\' I asked Sister Sara. She laughed heartily. \'They are in their proper places, in the mardana (men\'s quarters), where they belong!\'"',
    downloadablePdf: true
  },
  {
    id: 'rivers-and-rituals',
    title: 'Rivers & Rituals: Eco-Feminist Oral Histories',
    author: 'Samira Farhana & HerStory Researchers',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWSLLZ5ND5L4YhpyS9K_b55aON6fJkt-FiNDKvJthX0KV-zZz_IwC_qCZtXJEZOPhuC1Q0CykA2RaTbIe8LtPhPnI6rnNWO1G7OgNyDIViwXZAi7ua9qC5Un2FKtf9LNigipiLs0X0VkYOkH4a74rAkDnWphy3hQtEedzlSn3mc5_hs6zPrD1JoIfVUl-QuV-sgXniIOOTtYFrogIKJSAsryihQRFz_s_P4aqA706sZN782L40MosMGRrvo0fO_zXBysqGVdR-1ibd',
    description: 'A study of riverine women elders in southern delta regions preserving seed varieties, rain songs, and indigenous climate wisdom.',
    year: '2023',
    pages: 210,
    genre: 'Cultural History',
    price: '$22.00 / ৳1,500',
    excerptText: 'When the monsoon swelling threatens the silt embankments, the women of the Meghna delta gather at dawn to sing the Bhatiali tunes that calm both the river and the heart...',
    downloadablePdf: false
  },
  {
    id: 'myth-bridge-vol1',
    title: 'The Myth Bridge Graphic Anthology Vol. 1',
    author: 'HerStory Youth Workshop Collective',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBykIE3CulT7z-f5gSh1nAd9kuIzrYnNuRwca0qX0ebaVULo-uWCQgfIAR2p4y6Pg0b5IErKGij2fkspEW-oRe162nVpijn-DzabMZ_1GhcnsEkL53kS9fyEroOJLXLDnvjuFv1mrJtXDioFZY6f0HDHUa5bVA18pwzYULIujSL3DnXQ-CotpBkZSU9sYjIhsKJNSYBbROzG8liXokq4u8kvbC-57D-R7iiFMv4US9i4YlxQDkOnTwRNa6PhRY4b3xBtTBUpXidMlqw',
    description: 'Collection of 8 original graphic short stories recasting folk tales into speculative future worlds.',
    year: '2024',
    pages: 144,
    genre: 'Zine & Anthology',
    price: '$16.50 / ৳1,100',
    excerptText: 'In the year 2140, when urban skyways replaced soil roads, Moon Granny traded her brass needles for holographic fiber optics...',
    downloadablePdf: true
  }
];

export const SISTER_LIBRARY_ITEMS: SisterLibraryItem[] = [
  {
    id: 'sl-1',
    title: 'Deep Listening: A Composer\'s Sound Practice',
    author: 'Pauline Oliveros',
    category: 'Art Book',
    condition: 'Available',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    curatorNote: 'Essential reading for sonic activists and ensemble workshop facilitators in Project Ladyland.',
    donatedBy: 'Sister Library Mumbai Exchange'
  },
  {
    id: 'sl-2',
    title: 'Feminist Theory: From Margin to Center',
    author: 'bell hooks',
    category: 'Feminist Theory',
    condition: 'Available',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    curatorNote: 'Foundational text for all our community reading circles and volunteer orientation sessions.',
    donatedBy: 'HerStory Archives'
  },
  {
    id: 'sl-3',
    title: 'Chander Buri Zine: Celestial Threads',
    author: 'Jessore Artisan Guild',
    category: 'Zine',
    condition: 'Digital Copy',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400',
    curatorNote: 'Risograph printed zine documenting the embroidery stitches of 12 master kantha craftswomen.',
    donatedBy: 'Moon Granny Workshop'
  },
  {
    id: 'sl-4',
    title: 'The Mushroom at the End of the World',
    author: 'Anna Lowenhaupt Tsing',
    category: 'Feminist Theory',
    condition: 'On Loan',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
    curatorNote: 'Exploring multispecies survival and collaborative existence in capitalist ruins.',
    donatedBy: 'Dhaka Readers Collective'
  }
];

export const REFLECTION_ITEMS: ReflectionItem[] = [
  {
    id: 'ref-1',
    title: 'Reclaiming the Sky: Why Rokeya\'s 1905 Sci-Fi Belongs to Tomorrow',
    author: 'Zarin Tasnim',
    role: 'Lead Literary Fellow',
    date: 'July 14, 2026',
    readTime: '6 min read',
    category: 'Essay',
    excerpt: 'Long before modern cli-fi (climate fiction) was coined in western academies, Begum Rokeya Sakhawat Hosein envisioned solar balloons harvesting clean energy and cloud-condensers watering rice fields with gentle mist.',
    fullContent: `Long before modern cli-fi (climate fiction) was coined in western academies, Begum Rokeya Sakhawat Hosein envisioned solar balloons harvesting clean energy and cloud-condensers watering rice fields with gentle mist in her 1905 story *Sultana's Dream*.

When we re-read *Sultana's Dream* today in the flood-prone delta of Bangladesh, it reads less like a historical curiosity and more like an Urgent Design Manual. Rokeya did not merely critique the seclusion of women; she proposed a complete epistemological shift where science serves peace rather than war, where human intelligence works alongside the rain instead of damming it.

Through Project Ladyland 2026, we ask performance artists, young girls, and sound engineers to embody this vision. How do we build solar balloons not just as technical objects, but as symbols of collective liberation?`,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3AdXCBnNP1PxM57H4Drd7yukTHziz2-AxqwUPWPkREBPvNZPdHDiZKWjT5yyFzvVcA1fYv7ZFaF_jM78_IVhL5ma-soEKs68MnkvRfFIDYXB4wHhv_wJkrMl3C6PoupNLHGZEgho4YKFHV5NYJNVnVXTe1rjzmcP3pGB0o4H8Q2HX6mDWylK6JyDK1y90Pf1qLYBpiWsp5brEP7f21ncEogNvbVXY082UnRX4w1zRCMJ1dOiOhgS03ZRm-4Sr36rFRU1tLArYAww5'
  },
  {
    id: 'ref-2',
    title: 'Stitching as Resistance: Oral Archives in the Nakshi Kantha',
    author: 'Dr. Nusrat Jahan',
    role: 'Textile Historian & Curator',
    date: 'June 28, 2026',
    readTime: '8 min read',
    category: 'Interview',
    excerpt: 'How rural Bangladeshi women used worn saris, indigo thread, and secret symbols to build a parallel history unwritten by colonial scribes.',
    fullContent: `For centuries, rural women in Bengal were denied access to formal literacy. Yet they possessed a complex written language of their own—stitched with running threads onto recycled sari layers to create the Nakshi Kantha.

When a grandmother sits with her daughters in the afternoon courtyard, she is not merely quilting for warmth. Every lotus petal, wheel of fortune, and pair of peacocks represents a genealogical record, a prayer against famine, or an account of political rebellion.

At HerStory Foundation, our Moon Granny initiative honors this textile language as equal to printed text. We record the audio testimonies of the quilt-makers so that every stitch is accompanied by the voice that breathed life into it.`,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWSLLZ5ND5L4YhpyS9K_b55aON6fJkt-FiNDKvJthX0KV-zZz_IwC_qCZtXJEZOPhuC1Q0CykA2RaTbIe8LtPhPnI6rnNWO1G7OgNyDIViwXZAi7ua9qC5Un2FKtf9LNigipiLs0X0VkYOkH4a74rAkDnWphy3hQtEedzlSn3mc5_hs6zPrD1JoIfVUl-QuV-sgXniIOOTtYFrogIKJSAsryihQRFz_s_P4aqA706sZN782L40MosMGRrvo0fO_zXBysqGVdR-1ibd'
  },
  {
    id: 'ref-3',
    title: 'Podcast Episode #12: The Porous Library and Grassroots Feminism',
    author: 'HerStory Audio Collective',
    role: 'Audio Series',
    date: 'May 19, 2026',
    readTime: '24 min listen',
    category: 'Podcast Transcripts',
    excerpt: 'A discussion with Sister Library founder and local community librarians on making feminist archives accessible without rigid institutional barriers.',
    fullContent: `In this episode of HerStory Reflections, we host a round-table conversation with grassroots librarians operating mobile book carts in Dhaka, Mumbai, and Chittagong.

We explore how removing sign-up fees, library cards, and quiet-rules transforms a library into a lively sanctuary where women feel safe to discuss books, write zines, and organize community initiatives.`,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiCCwb5hw25jEf7BCsnm3RfOWmlf3ulD00HGoBu8sZms4EBZ9ZS16eo20kn52ci6Y4YSte-T9Vf0FtmdcfapZ1yoab_6MVKqvThPEaYbAGiYu0hiqTmKi54e9PsFSlg-g29XYe48oz0P1z-wVcTtCzHNdqfvbDgNIjX8_8jlNP4VaDFsI25gtVk_YNoKoUQ6Bz3Ej5_J4FdNia3ralYmEZxJqvOXMmjSmLrFP5xrtn6tt8LUDkjAOvxl-cpmY0cvT2eBuoEO5ShshA'
  }
];
