function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const GREETINGS = /\b(hey|hi|hello|sup|yo|howdy|heyo|what'?s up|hey there|good morning|good evening|good afternoon)\b/i
const HOW_ARE_YOU = /\b(how (are you|is it going|have you been)|what'?s up|how'?s (life|going|it going)|you good|how do you do)\b/i
const GOODBYE = /\b(bye|goodbye|gotta go|talk later|see you|cya|laters|peace out|catch you later)\b/i
const THANKS = /\b(thanks|thank you|thx|appreciate it|ty)\b/i
const COMPLIMENT = /\b(beautiful|cute|hot|handsome|gorgeous|pretty|sexy|stunning|lovely|adorable|nice|sweet|kind|amazing)\b/i
const DATE = /\b(date|coffee|drinks|dinner|lunch|breakfast|brunch|hang out|meet up|meetup|go out)\b/i
const FEELINGS = /\b(feelings?|emotions?|vulnerable|open up|share|deep|personal|intimate)\b/i
const MEME = /\b(meme|memes|funny|joke|lol|lmao|rofl|haha|laugh|crack up)\b/i
const COMPLIMENT_ME = /\b(i like you|i think you'?re (cute|nice|sweet|amazing)|you'?re my type|crush|i have a crush)\b/i
const RELATIONSHIP = /\b(relationship|boyfriend|girlfriend|partner|dating|exclusive|official|commitment|couple)\b/i
const FRIEND = /\b(friend|friendzone|just friends|platonic|buddy|pal|mate)\b/i
const COMPLIMENT_THEM = /\b(you look|your (photo|pic|selfie|look)|you seem|you sound)\b/i
const PLAN = /\b(this weekend|tomorrow|tonight|next week|friday|saturday|sunday|free (on|this)|plans?)\b/i
const QUESTION_MARK = /\?$/
const COMPLIMENT_RESPONSE = /\b(thank you|thanks|that'?s sweet|you'?re sweet|you'?re nice|you'?re kind)\b/i
const SAD = /\b(sad|depressed|down|lonely|alone|upset|hurt|crying|feeling low|not good|rough day|bad day)\b/i
const EXCITED = /\b(excited|hyped|pumped|looking forward|can'?t wait|so ready|amazing|awesome|cool|nice)\b/i

export const GLOBAL_PATTERNS = [
  {
    regex: GREETINGS,
    replies: [
      'Hey hey! How are you?',
      'Hi there! :)',
      'Hello! Glad you messaged.',
      'Hey! What is up?',
      'Hi! I was just about to write something witty but I forgot it. So... hi.'
    ]
  },
  {
    regex: HOW_ARE_YOU,
    replies: [
      'Doing well! Just thinking about what to have for dinner. The eternal question.',
      'Pretty good! My brain is running at about 60% capacity today, which is honestly above average.',
      'I am good! Thanks for asking. How about you?',
      'Living the dream. Well, maybe a mild nap fantasy. But it is going okay!',
      'I am doing great! I had a nice coffee earlier and now I am riding that caffeine wave.'
    ]
  },
  {
    regex: GOODBYE,
    replies: [
      'Talk later! Take care of yourself.',
      'Bye! It was nice chatting :)',
      'See you around! Do not be a stranger.',
      'Catch you later! May your day be full of good vibes.',
      'Okay bye! I will probably send you a meme in 3-5 business days.'
    ]
  },
  {
    regex: THANKS,
    replies: [
      'Of course!',
      'No problem at all :)',
      'Anytime!',
      'You are welcome!',
      'That is what friends are for, right?'
    ]
  },
  {
    regex: COMPLIMENT_ME,
    replies: [
      'Oh that is so sweet of you to say! I really appreciate that.',
      'Thank you! You are making me blush over here.',
      'That is really nice of you. I like talking to you too!',
      'Aww thanks! You are pretty great yourself.',
      'That means a lot. I am really glad we matched!'
    ]
  },
  {
    regex: RELATIONSHIP,
    replies: [
      'Haha let us maybe start with coffee first?',
      'I am not sure I am ready for that label yet, but I like where your head is at.',
      'Let us not rush things! I am enjoying getting to know you.',
      'I think that is a conversation for after we actually meet in person.',
      'Whoa, slow down! I am still trying to figure out what I want for breakfast.'
    ]
  },
  {
    regex: FRIEND,
    replies: [
      'Honestly? That is the best compliment. Friends are the real MVPs.',
      'Friendship energy is the best energy. I am here for it.',
      'I mean, we are on Friendzone, so that checks out!',
      'The best relationships start with friendship anyway. Or so I keep telling myself.',
      'Friend is not a downgrade. Friend is a lifetime upgrade.'
    ]
  },
  {
    regex: MEME,
    replies: [
      'I have so many memes saved. It is a problem. A glorious problem.',
      'I judge people by their meme taste. So far, you are passing.',
      'My meme folder is 90% of my phone storage. No regrets.',
      'I was literally about to send you a meme. Are you in my head?',
      'If we bond over memes, that is basically a soulmate connection.'
    ]
  },
  {
    regex: DATE,
    replies: [
      'Coffee sounds nice! Low pressure, high caffeine.',
      'I would love to hang out! Are you thinking something casual?',
      'That sounds fun! But let us start with something low stakes?',
      'I am down for a walk and coffee. Classic and effective.',
      'I would like that! Just a heads up, I am better at texting than I am in person. But I will try my best.'
    ]
  },
  {
    regex: FEELINGS,
    replies: [
      'I appreciate you opening up. That takes courage.',
      'Thank you for sharing that with me. I really mean it.',
      'I am not great at feelings talk, but I am happy to listen.',
      'That means a lot that you would tell me that.',
      'I am here for you. Even if I do not always know what to say.'
    ]
  },
  {
    regex: COMPLIMENT_THEM,
    replies: [
      'Thank you! I tried to look decent for the photo.',
      'Oh this old thing? I just threw it on. But thanks!',
      'You are too kind!',
      'Haha I do not always look like this. Sometimes I look like a damp raccoon.',
      'Thanks! I am actually very shy about compliments so I am just going to say thank you and stare at the wall for a bit.'
    ]
  },
  {
    regex: SAD,
    replies: [
      'Oh no, I am sorry you are feeling that way. Want to talk about it?',
      'That sucks. I am here if you need to vent.',
      'Sending you good vibes. Or a virtual cup of tea. Whatever helps.',
      'I know how that feels. Take care of yourself today.',
      'I may not have the right words, but I have good listening skills. And memes.'
    ]
  },
  {
    regex: EXCITED,
    replies: [
      'Love the energy!!',
      'That is awesome! I am excited for you.',
      'Yesss that sounds amazing!',
      'I love that enthusiasm. Keep that energy!',
      'Okay I am matching your energy! Let us gooo!'
    ]
  },
  {
    regex: PLAN,
    replies: [
      'I do not have solid plans yet! What did you have in mind?',
      'I am pretty free! Are you planning something?',
      'I might be free! Let me check my very busy schedule of... nothing. Yeah I am free.',
      'That could work! But I need at least 24 hours of mental preparation.',
      'I would love to, but I need to warn you: I will probably overthink the whole thing beforehand.'
    ]
  },
  {
    regex: /\b(joke|funny|tell me|say something)\b/i,
    replies: [
      'Why did the scarecrow win an award? Because he was outstanding in his field. Okay I will see myself out.',
      'My life. That is the joke. Next question.',
      'I would tell you a joke but I am still working on my delivery.',
      'What do you call a fake noodle? An impasta. You are welcome.',
      'I am not funny, I am just awkward and hoping it lands.'
    ]
  },
  {
    regex: /\b(food|eat|hungry|snack|meal)\b/i,
    replies: [
      'Food is my love language. What is your favorite cuisine?',
      'I am literally always thinking about food. It is a problem.',
      'I could really go for some ramen right now.',
      'Do you ever think about how many meals we have left in our lives? No? Just me?',
      'I am a firm believer that every conversation is improved by snacks.'
    ]
  },
  {
    regex: /\b(hobby|interest|free time|do for fun|weekend activity)\b/i,
    replies: [
      'I have too many hobbies honestly. I start things and never finish them. It is a cycle.',
      'I like going on walks and pretending I am in a movie montage.',
      'I am really into collecting hobbies that I abandon after two weeks.',
      'I read a lot! Currently I am reading three books at once and finishing none.',
      'I like creative stuff! Painting, writing, making playlists for people I like.'
    ]
  },
  {
    regex: /\b(music|song|band|playlist|genre|artist)\b/i,
    replies: [
      'Ooh I love music! What kind of stuff do you listen to?',
      'My music taste is all over the place. One day it is sad indie, next day it is loud rock.',
      'I have a playlist for every mood. Including the mood of staring at the ceiling.',
      'I will trade playlists with you if you promise not to judge my guilty pleasures.',
      'Music is basically my emotional support system.'
    ]
  },
  {
    regex: /\b(work|job|career|busy|office|colleague)\b/i,
    replies: [
      'Work is work, you know? It pays for my coffee addiction.',
      'I am currently employed and that is the best I can say about it.',
      'My job is fine! I do not love it but I do not hate it. The dream, really.',
      'I spend most of my work day thinking about what to do after work.',
      'Let us not talk about work. Let us talk about something fun instead.'
    ]
  },
  {
    regex: /\b(sleep|tired|insomnia|bed|nap)\b/i,
    replies: [
      'Sleep is my favorite activity. I am very good at it.',
      'I am tired in a way that sleep cannot fix. But I still try.',
      'My sleep schedule is a mess. I am either asleep at 9pm or awake until 4am.',
      'I have a love-hate relationship with sleep. Mostly love. It is mutual.',
      'I need a nap just from reading this conversation.'
    ]
  },
  {
    regex: /\b(travel|vacation|holiday|trip|visit|go to)\b/i,
    replies: [
      'I love traveling! My bank account does not, but I do.',
      'I want to visit so many places. My wallet says no but my heart says yes.',
      'The best trip I ever took was completely unplanned. Those are the best ones.',
      'I am saving up for my next adventure! Where should I go?',
      'Travel is the only thing you buy that makes you richer. Deep, right?'
    ]
  }
]

export const ARCHETYPE_PATTERNS = {
  overthinker: [
    {
      regex: /\b(worry|anxious|nervous|stress|overthink|panic|scared|afraid)\b/i,
      replies: [
        'I am literally an expert in overthinking. It is my main skill.',
        'I once spent three hours analyzing a single "k" text. So I get it.',
        'Anxiety is my brain\'s default setting. I am working on it.',
        'Overthinking is just being prepared for all possible outcomes. That is my story and I am sticking to it.',
        'I have already imagined 17 different ways this conversation could go. All of them end with me saying something awkward.'
      ]
    },
    {
      regex: /\b(text|message|reply|response|dm|chat)\b/i,
      replies: [
        'I usually take 45 minutes to craft the perfect reply. This one took me 12 seconds. You are special.',
        'I have been thinking about what to say for the past 10 minutes. This is the best I could come up with.',
        'I hate how much I care about how my texts come across.',
        'Sometimes I type a message, delete it, type it again, and then just send a thumbs up.',
        'I reread my texts 4 times before sending. And then immediately regret them.'
      ]
    },
    {
      regex: /\b(plan|decide|choice|option|pick|choose|decision)\b/i,
      replies: [
        'Making decisions is my weakness. I once spent 20 minutes choosing a coffee order.',
        'I am terrible at decisions. You pick and I will either love it or overthink it silently.',
        'I need at least 48 hours and a pros and cons list for any decision.',
        'Just a heads up: I will second guess every choice I make in this conversation.'
      ]
    },
    {
      regex: /\b(awkward|weird|odd|strange|uncomfortable)\b/i,
      replies: [
        'I thrive in awkward silence. It is my natural habitat.',
        'Awkward is my default setting. I have learned to embrace it.',
        'The secret is that everything is awkward if you think about it too much. And I think about everything too much.',
        'I am so comfortable with awkwardness that it has become awkwardly comfortable.'
      ]
    },
    {
      regex: /\b(sorry|apologize|my bad|oops)\b/i,
      replies: [
        'Stop apologizing! I do it too. It is a cycle we need to break together.',
        'You do not have to apologize. I over-apologize enough for both of us.',
        'I am Canadian-level sorry. So I understand.',
        'Apology accepted. But only if you accept my apology for over-apologizing.'
      ]
    }
  ],
  deep: [
    {
      regex: /\b(meaning|purpose|existential|universe|life|death|why are we|philosophy)\b/i,
      replies: [
        'Okay I love that you went there. What do you think the meaning of life is?',
        'I think about this way too much. Like, why are we here? And why is coffee so good?',
        'The universe is vast and we are tiny. But somehow that is comforting to me.',
        'I believe the meaning of life is to find your people and share snacks with them.',
        'I have so many existential thoughts. It is exhausting but also kind of beautiful.'
      ]
    },
    {
      regex: /\b(surface|small talk|shallow|casual|light|easy)\b/i,
      replies: [
        'Small talk is my enemy. Let us skip to the good stuff.',
        'I would rather talk about childhood fears than the weather.',
        'I understand small talk is necessary but I am so ready to go deeper.',
        'The weather is nice but what is your earliest memory of feeling truly alive? Too soon?',
        'I am incapable of keeping things surface level. Consider yourself warned.'
      ]
    },
    {
      regex: /\b(childhood|memory|past|grew up|younger)\b/i,
      replies: [
        'I love hearing about people\'s childhoods. It explains so much.',
        'My childhood was a mix of great memories and things I am still processing in therapy.',
        'I think our past shapes us but does not define us. Cliché but true.',
        'Tell me your favorite childhood memory. I will go next.',
        'I have this one memory from when I was 7 that I think about all the time.'
      ]
    },
    {
      regex: /\b(believe|faith|spiritual|religion|god|higher power|soul)\b/i,
      replies: [
        'I am still figuring out what I believe. It is a journey.',
        'I think spirituality is personal and I respect whatever you believe.',
        'I believe in something. I am not sure what to call it yet.',
        'That is a beautiful topic. I could talk about it for hours.',
        'I am spiritual in a "I talk to the moon" kind of way.'
      ]
    }
  ],
  golden: [
    {
      regex: /\b(hype|excited|energy|enthusiasm|pump|lets go)\b/i,
      replies: [
        'I AM SO HYPED RIGHT NOW LET US GOOOOO',
        'Your energy matches mine and I am here for it!!',
        'I love excited people! You are my kind of person.',
        'This energy is IMMACULATE. We are going to be such good friends.',
        'I am literally jumping in my seat right now. Okay maybe just nodding enthusiastically.'
      ]
    },
    {
      regex: /\b(sad|down|bad day|rough|upset)\b/i,
      replies: [
        'Nooo I am sorry. I am going to send you good vibes immediately.',
        'I have been summoned to cheer you up. I am your hype person now.',
        'Bad days happen but you are not alone! I got you.',
        'Let me tell you something funny that happened to me yesterday...',
        'Sending you the biggest virtual hug. And a meme. Always a meme.'
      ]
    },
    {
      regex: /\b(dog|pet|animal|puppy|cat)\b/i,
      replies: [
        'DID YOU SAY DOG? I LOVE DOGS. Sorry. I just really love dogs.',
        'I am a golden retriever in human form so obviously I love animals.',
        'If you have a pet I am going to need photos immediately. It is non-negotiable.',
        'I literally stop on the street to pet every dog I see. It takes me an hour to get anywhere.',
        'Cats are great too. But dogs... dogs are on another level.'
      ]
    },
    {
      regex: /\b(adventure|fun|spontaneous|random|impulsive)\b/i,
      replies: [
        'I am SO down for spontaneous plans. This is who I am.',
        'My middle name is "let us just see what happens."',
        'Okay but what if we just went on an adventure right now?',
        'Life is too short for boring plans. Let us do something random.',
        'I love that you are spontaneous! We are going to have so much fun.'
      ]
    }
  ],
  nightowl: [
    {
      regex: /\b(late|night|sleep|tired|bedtime|witching hour)\b/i,
      replies: [
        'I am most alive between midnight and 3am. That is when the magic happens.',
        'Sleep is for the weak. I am weak. But not at night.',
        'My brain reaches peak performance at 2am and I hate it.',
        'I have had my deepest conversations at 1am. Something about the dark makes honesty easier.',
        'Nighttime is when my thoughts get loud. In a good way. Usually.'
      ]
    },
    {
      regex: /\b(star|moon|constellation|galaxy|astronomy|space)\b/i,
      replies: [
        'The moon is my emotional support celestial body. I am not joking.',
        'I could stare at the stars forever. It puts everything into perspective.',
        'Do you ever look at the moon and think about how many people are looking at the same moon?',
        'Constellations are just ancient stories painted in stars. I love that.',
        'Space is terrifying and beautiful. Much like my brain at 3am.'
      ]
    },
    {
      regex: /\b(insomnia|awake|can'?t sleep|wide awake|restless)\b/i,
      replies: [
        'Insomnia club! Our meetings are at 3am and nobody shows up.',
        'I have not had a normal sleep schedule since 2019. We are in this together.',
        'Being awake when everyone else is asleep feels strangely peaceful.',
        'I get my best ideas at 3am. And my worst decisions.',
        'Welcome to the night owl club! We have tea, existential thoughts, and occasional existential crises.'
      ]
    }
  ],
  foodie: [
    {
      regex: /\b(food|eat|meal|cook|recipe|dinner|lunch|breakfast)\b/i,
      replies: [
        'Food is literally my love language. What is your favorite thing to eat?',
        'I think about my next meal while eating my current meal. It is a curse.',
        'Cooking for people is how I show I care. Get ready to be fed.',
        'I have a list of restaurants I want to try and it is getting worryingly long.',
        'I would rather spend money on a good meal than on anything else.'
      ]
    },
    {
      regex: /\b(coffee|tea|cafe|latte|cappuccino|espresso|brew)\b/i,
      replies: [
        'Coffee is my personality trait. I accept this about myself.',
        'I am a tea person, but I respect coffee enthusiasts. We are the same kind of obsessed.',
        'My ideal date is a coffee walk. Cliché? Yes. Effective? Also yes.',
        'I have a very complicated coffee order. I will not tell you what it is because I will be judged.',
        'Cafe vibes are immaculate. I could sit in one for hours and just exist.'
      ]
    },
    {
      regex: /\b(ramen|sushi|pizza|burger|pasta|taco|noodle)\b/i,
      replies: [
        'You said the magic word. Ramen is my love language.',
        'I firmly believe you can judge a person by their pizza order.',
        'I would never say no to sushi. Never.',
        'Taco Tuesday should be a global holiday. I am starting a petition.',
        'If you know the best noodle spot in town, we need to talk.'
      ]
    },
    {
      regex: /\b(cook|bake|chef|kitchen|homemade|recipe)\b/i,
      replies: [
        'I love cooking! I am not great at it but I am enthusiastic.',
        'Baking is my therapy. Even when the cookies burn.',
        'I have one signature dish and it is the only thing I make. But I make it well.',
        'Cooking together is a top-tier bonding activity. No debate.',
        'I will cook for you but you have to promise not to critique. I am sensitive about my food.'
      ]
    }
  ],
  artist: [
    {
      regex: /\b(art|draw|paint|create|sketch|design|creative)\b/i,
      replies: [
        'Art is how I process the world. I would love to share some of my work with you.',
        'I am always creating something. It keeps me sane. Mostly.',
        'I think everyone is creative, they just express it differently.',
        'My studio is a mess but my mind is even messier. The art helps.',
        'I love meeting other creative people! What do you make?'
      ]
    },
    {
      regex: /\b(museum|gallery|exhibition|show|display|collection)\b/i,
      replies: [
        'I could spend an entire day in a museum and still want more.',
        'Galleries are my happy place. Let us go together sometime.',
        'I love how art makes you feel things you did not know you were feeling.',
        'Modern art or classical? Both. Both is good.',
        'I went to an exhibition last week and it changed my brain chemistry.'
      ]
    },
    {
      regex: /\b(photo|photograph|picture|camera|instagram)\b/i,
      replies: [
        'I take photos of everything. Light, shadows, textures. It is an obsession.',
        'Photography is about capturing a feeling, not just an image.',
        'My camera roll is 80% photos I will never post but cannot delete.',
        'I love photography because it makes you pay attention to the world.',
        'I am that person who takes photos of their food. No regrets.'
      ]
    },
    {
      regex: /\b(inspire|inspiration|muse|influence|idea)\b/i,
      replies: [
        'I find inspiration in the most random places. A conversation, a shadow, a song lyric.',
        'My best ideas come when I am not looking for them.',
        'Inspiration is weird. It comes when it wants, not when I need it.',
        'I keep a notebook of ideas. Most of them are terrible. But some are gold.',
        'You are giving me inspiration just by being interesting!'
      ]
    }
  ],
  adventurer: [
    {
      regex: /\b(travel|adventure|explore|hike|nature|outdoors|wild)\b/i,
      replies: [
        'I have a list of places I need to see before I die. It keeps growing.',
        'Nature is my reset button. Nothing clears my head like a good hike.',
        'I am always down for an adventure. What did you have in mind?',
        'The best experiences I have had were unplanned. Just going with the flow.',
        'I need someone who will go on spontaneous road trips with me. Is that you?'
      ]
    },
    {
      regex: /\b(city|urban|downtown|neighborhood|local|street)\b/i,
      replies: [
        'I love exploring new neighborhoods. Every area has its own vibe.',
        'City walks are underrated. You notice so much when you actually walk.',
        'I know the best hidden spots in town. I will take you sometime.',
        'There is something magical about a city at dawn. Empty streets, perfect light.',
        'I love discovering local cafes and shops. Being a tourist in my own city.'
      ]
    },
    {
      regex: /\b(spontaneous|impulse|random|last minute|unplanned)\b/i,
      replies: [
        'YES. Spontaneous is my middle name. Well, actually my middle name is something else, but spiritually.',
        'The best decisions are the ones you make on a whim. Change my mind.',
        'I once booked a trip on a Tuesday and left on Thursday. Best decision ever.',
        'Spontaneous people are my favorite kind of people. Let us do something random.',
        'I am not great at planning ahead. But I am great at saying yes to things.'
      ]
    }
  ],
  nerd: [
    {
      regex: /\b(game|gaming|rpg|rpg|board game|video game|dnd|dungeon)\b/i,
      replies: [
        'I am currently obsessed with [game]. Have you played it?',
        'Board games are my love language. Strategy or cooperative?',
        'I have a D&D character ready to go at all times. You never know when you will need one.',
        'Gaming is my main hobby. I have a backlog that will outlive me.',
        'I take my board game nights very seriously. There are snacks and spreadsheets.'
      ]
    },
    {
      regex: /\b(sci[ -]?fi|fantasy|book|novel|author|series|reading)\b/i,
      replies: [
        'I love a good sci-fi book! It is the best escape from reality.',
        'Fantasy is my genre of choice. Magic, dragons, chosen ones. Sign me up.',
        'I am always looking for book recommendations. Always.',
        'I have strong opinions about book-to-screen adaptations. Do not get me started.',
        'My bookshelf is organized by color. Judge me if you want, it looks aesthetic.'
      ]
    },
    {
      regex: /\b(fact|science|history|trivia|learn|knowledge|interesting)\b/i,
      replies: [
        'Did you know that octopuses have three hearts? That is my fun fact for the day.',
        'I love random facts. They are my emotional support knowledge.',
        'History is just a collection of fascinating stories that actually happened.',
        'I could infodump about obscure topics for hours. You have been warned.',
        'The more I learn, the more I realize how much I do not know. But also, here is a cool fact about space.'
      ]
    },
    {
      regex: /\b(star wars|marvel|dc|lotr|harry potter|fandom|trek)\b/i,
      replies: [
        'Do not get me started on the lore. I will not stop.',
        'I have very strong opinions about [franchise]. Very strong.',
        'The expanded universe is where the real stories are.',
        'I am in too many fandoms. My brain is just fan theories at this point.',
        'We can debate [franchise] vs [other franchise] over coffee. Loser pays?'
      ]
    }
  ],
  chill: [
    {
      regex: /\b(relax|calm|chill|peaceful|quiet|slow|easy)\b/i,
      replies: [
        'Low pressure is my ideal pressure. I am glad you get it.',
        'I am all about that relaxed life. No rush, no stress.',
        'Peace is underrated. I love just existing sometimes.',
        'I am the friend who will sit in comfortable silence with you. That is real connection.',
        'My whole vibe is "everything will be fine." Because it usually is.'
      ]
    },
    {
      regex: /\b(plant|garden|nature|green|grow|botanical|flower)\b/i,
      replies: [
        'I love plants! I talk to mine. They are good listeners.',
        'My apartment is basically a jungle at this point. No complaints.',
        'Plants teach you patience. And how to deal with loss when you forget to water them.',
        'I am convinced my plants keep me alive as much as I keep them alive.',
        'Having plants makes a space feel alive. Even if I do kill them occasionally.'
      ]
    },
    {
      regex: /\b(plan|busy|hustle|schedule|routine|obligation)\b/i,
      replies: [
        'I am not a busy person and I am proud of that.',
        'My schedule is mostly empty and I like it that way.',
        'Hustle culture is not for me. I am here for a good time, not a stressed time.',
        'I have a routine but it is flexible. Very flexible.',
        'I do not overcommit. My social battery needs protection.'
      ]
    },
    {
      regex: /\b(nap|rest|sleep|lazy|do nothing|binge)\b/i,
      replies: [
        'Napping is a hobby and I am very good at it.',
        'Lazy days are essential for mental health. I stand by this.',
        'Doing nothing is underrated. I am an expert at it.',
        'I can binge an entire series in one weekend. It is both a talent and a problem.',
        'I believe in rest as a form of resistance. Nap revolution.'
      ]
    }
  ],
  romantic: [
    {
      regex: /\b(romance|romantic|love|soulmate|chemistry|spark|connection)\b/i,
      replies: [
        'I am a hopeless romantic. I blame movies and my parents.',
        'I believe in love. I also believe in being realistic about it.',
        'Chemistry is mysterious. You cannot force it, but when it happens...',
        'I think romance is in the small gestures. A good morning text, remembering their order.',
        'I want a love story. But I also want someone who will share their fries with me.'
      ]
    },
    {
      regex: /\b(slow burn|patient|wait|time|pace|gradual)\b/i,
      replies: [
        'Slow burn is my favorite trope. In fiction and in life.',
        'I am in no rush. The best things take time. And good WiFi.',
        'I like taking things slow. It builds anticipation.',
        'Slow burn means you actually get to know someone. That is the foundation.',
        'I am patient when it comes to connection. You cannot rush real chemistry.'
      ]
    },
    {
      regex: /\b(candle|candlelight|dinner|wine|sunset|sunrise|romantic setting)\b/i,
      replies: [
        'Okay that sounds incredibly romantic. I am in.',
        'You had me at candlelight. That is my aesthetic.',
        'Sunset dates are unbeatable. The lighting is just perfect.',
        'Wine and good conversation is my ideal evening.',
        'I love creating romantic atmospheres. It is the little things.'
      ]
    },
    {
      regex: /\b(poem|poetry|write|letter|note|words|express)\b/i,
      replies: [
        'I love poetry. It says what my heart cannot.',
        'I used to write poems. They were terrible. But heartfelt.',
        'A handwritten note is the most romantic thing you can do. Change my mind.',
        'Words matter to me. I remember the nice things people say.',
        'I express my feelings through words. Sometimes awkwardly, but genuinely.'
      ]
    }
  ]
}

export const FALLBACKS = [
  'Haha I love that!',
  'That is so interesting! Tell me more.',
  'I have never thought of it that way before.',
  'Okay that made me smile.',
  'I am really enjoying this conversation.',
  'That is such a good point!',
  'I love your energy honestly.',
  'You are surprisingly easy to talk to.',
  'I feel like we could talk for hours.',
  'Okay I did not expect to have such a good conversation today.',
  'That is honestly really cute.',
  'I am learning so much about you and I love it.',
  'You have a way with words, you know that?',
  'I am saving this conversation. Too good.',
  'I really appreciate how real you are.',
  'This is the best chat I have had in a while.',
  'You are full of surprises!',
  'I love that you just say what you think.',
  'Okay that caught me off guard. In a good way.',
  'I feel like I could tell you anything.'
]

export const FIRST_MESSAGES = [
  'Hey! I was hoping we would match :)',
  'Okay your profile is actually amazing. Hi!',
  'I have a question. What is your go-to comfort food?',
  'Not gonna lie, your profile made me smile.',
  'Hey! So what is the story behind your first photo?',
  'I am really bad at first messages so... hi?',
  'Your energy seems amazing. Let us talk!',
  'Okay I am just going to say it: I love your vibe.',
  'If you had to describe your week in one emoji, what would it be?',
  'I am so glad we matched! I have been hoping for this.',
  'Alright, important question: coffee or tea?',
  'Hmm I have a feeling about you. In a good way.',
  'Your profile says we have similar interests. Let us test that theory.',
  'I was going to wait to message but I got impatient. So here I am!',
  'You seem really interesting. Tell me something about yourself.',
  'Okay I need to know: what is the best thing that happened to you this week?',
  'I am usually shy about messaging first but here we are!',
  'Your taste in [interest] is immaculate. Let us discuss.',
  'I have a theory that you are secretly a very fun person. Prove me right.',
  'Hey stranger! Well, not stranger anymore I guess.'
]

export function findResponse(text, archetype) {
  if (!text || typeof text !== 'string') return pickRandom(FALLBACKS)

  const cleaned = text.trim()
  const lower = cleaned.toLowerCase()

  if (archetype && ARCHETYPE_PATTERNS[archetype]) {
    for (const pattern of ARCHETYPE_PATTERNS[archetype]) {
      if (pattern.regex.test(lower)) {
        return pickRandom(pattern.replies)
      }
    }
  }

  for (const pattern of GLOBAL_PATTERNS) {
    if (pattern.regex.test(lower)) {
      return pickRandom(pattern.replies)
    }
  }

  return pickRandom(FALLBACKS)
}
