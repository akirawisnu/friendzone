const NAMES = [
  'Zara','Ken','Lina','Ari','Maya','Jamie','Finn','Nora','Eli','Rosa',
  'Theo','Ivy','Leo','Mila','Kai','Zoe','Max','Luna','Ace','Iris',
  'Jade','Cole','Romy','Otto','Sage','Wren','Belle','Drew','Pearl','Hugo',
  'Tess','Finnley','Noa','Lena','Milo','Ruby','Jack','Eden','Oli','Vera',
  'Ash','Quinn','Skye','Blue','Lake','River','Wrenley','True','Nova','Atlas',
  'Remi','Lane','Shay','Blake','Reese','Jules','Drew','Avery','Casey','Morgan',
  'Harper','Rowan','Parker','Skyler','Dakota','Emerson','Finley','Sawyer','Charlie','Bailey',
  'Tatum','Phoenix','Cameron','Alexis','Jordan','Hayden','Dylan','Logan','Sidney','Riley',
  'Sam','Frankie','Stevie','Andy','Marley','Jess','Taylor','Quinnly','Billie','Devin',
  'Kerry','Pat','Robin','Lee','Kendall','Shawn','Sasha','Brett','Kerry','Marion',
  'Adi','Sari','Bayu','Dewi','Chandra','Rina','Dimas','Putri','Eko','Wulan',
  'Fajar','Citra','Gilang','Dian','Hendra','Fitri','Indra','Gita','Joko','Hana',
  'Emilia','Liam','Marie','Lukas','Sophie','Felix','Anna','Jonas','Laura','Maximilian'
]

const CITIES = [
  'Berlin','Hamburg','Munich','Cologne','Frankfurt','Stuttgart','Düsseldorf','Leipzig','Dresden','Bonn',
  'Freiburg','Heidelberg','Hannover','Nuremberg','Bremen','Bochum','Münster','Aachen','Kiel','Potsdam',
  'Essen','Dortmund','Bielefeld','Mannheim','Kassel',
  'Jakarta','Surabaya','Bandung','Yogyakarta','Bali','Medan','Semarang','Makassar','Bogor','Malang'
]

const ARCHETYPES = {
  overthinker: {
    bio: [
      'My brain runs on anxiety and good intentions.',
      'I analyze text messages for a living. Well, as a hobby.',
      'Together we could overthink one text for forty minutes.',
      'I spend 80% of my mental energy on things that never happen.',
      'My favourite activity is mentally rehearsing conversations that will never occur.'
    ],
    interests: ['overthinking','deep talks','coffee','anxiety playlists','planning']
  },
  deep: {
    bio: [
      'I am looking for someone to discuss the meaning of life with.',
      'Small talk is my mortal enemy. Let us get existential.',
      'I think about the universe a lot. Also about what to have for dinner.',
      'I want a connection that goes beyond surface level.',
      'Deep conversations are my love language. That and good food.'
    ],
    interests: ['philosophy','deep talks','books','meaningful connections','existential dread']
  },
  golden: {
    bio: [
      'I am basically a golden retriever in human form.',
      'My energy is chaotic but my intentions are pure.',
      'I am the friend who hypes everyone up. Including you now.',
      'I will bring the good vibes and the bad jokes.',
      'My personality is 90% enthusiasm and 10% overthinking.'
    ],
    interests: ['good vibes','comedy','hiking','dogs','enthusiasm']
  },
  nightowl: {
    bio: [
      'My best ideas come at 2am. My worst decisions too.',
      'I am either asleep at 9pm or awake until 5am. No in between.',
      'Nighttime is when the real conversations happen.',
      'I have a complicated relationship with sleep. It is mostly one-sided.',
      'The moon is my emotional support celestial body.'
    ],
    interests: ['late nights','stargazing','deep chats','music','existential thoughts']
  },
  foodie: {
    bio: [
      'I love food more than most people. Do not test me.',
      'My love language is cooking for you. Or ordering takeout together.',
      'I plan my weekends around where I am going to eat.',
      'Good food and good company. That is all I need.',
      'I have never met a cuisine I did not like.'
    ],
    interests: ['cooking','food','ramen','brunch','coffee']
  },
  artist: {
    bio: [
      'I see beauty in the ordinary. Or at least I try to.',
      'I express myself through art. And awkward silences.',
      'My studio is messy but my vision is clear.',
      'I find inspiration everywhere. Especially in cafes.',
      'Creating things is how I process the world.'
    ],
    interests: ['art','music','photography','galleries','creative projects']
  },
  adventurer: {
    bio: [
      'I like to just go and see what happens.',
      'Life is about experiences. I am collecting them one at a time.',
      'I will try almost anything once. Almost.',
      'The best memories come from unplanned adventures.',
      'I am looking for someone to say yes to spontaneous plans.'
    ],
    interests: ['travel','hiking','camping','exploring','spontaneous trips']
  },
  nerd: {
    bio: [
      'I will infodump about my special interest if given the chance.',
      'My personality is a carefully curated collection of niche references.',
      'I get excited about the strangest things and I am not sorry.',
      'I have a hyperfixation and it is my entire personality right now.',
      'My ideal date is a museum followed by a heated debate about lore.'
    ],
    interests: ['sci-fi','board games','fantasy books','gaming','museums']
  },
  chill: {
    bio: [
      'My energy is calm but my group chat is chaos.',
      'Low pressure is my ideal pressure.',
      'I collect plants and avoid drama.',
      'I am the friend who will cancel plans and we can both be relieved.',
      'Good vibes only. And coffee.'
    ],
    interests: ['plants','low pressure','coffee walks','good vibes','napping']
  },
  romantic: {
    bio: [
      'Hopeless romantic with a healthy dose of realism.',
      'I believe in love. I also believe in taking 48 hours to reply.',
      'My ideal date is a coffee walk that turns into a 4-hour conversation.',
      'I am looking for someone who wants the same things but is not in a rush.',
      'Romance optional. Deep connection required.'
    ],
    interests: ['romance','deep talks','slow burn','candlelight','poetry']
  }
}

const ARCHETYPE_KEYS = Object.keys(ARCHETYPES)

function generateProfiles() {
  const profiles = []
  const usedIds = new Set()
  for (let i = 0; i < NAMES.length; i++) {
    let id = NAMES[i].toLowerCase()
    if (usedIds.has(id)) id += i
    usedIds.add(id)
    const archetype = ARCHETYPE_KEYS[i % ARCHETYPE_KEYS.length]
    const data = ARCHETYPES[archetype]
    const photo = i < 6
      ? `./avatars/${NAMES[i].toLowerCase()}.jpg`
      : `https://api.dicebear.com/9.x/avataaars/svg?seed=${id}`
    profiles.push({
      id,
      name: NAMES[i],
      age: 24 + Math.floor(Math.random() * 12),
      city: CITIES[Math.floor(Math.random() * CITIES.length)],
      photo,
      bio: data.bio[Math.floor(Math.random() * data.bio.length)],
      interests: [...data.interests],
      willMatch: Math.random() < 0.5,
      archetype
    })
  }
  return profiles
}

export const PROFILES = generateProfiles()
export { ARCHETYPES, ARCHETYPE_KEYS }
