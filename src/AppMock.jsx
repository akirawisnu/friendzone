import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Heart, X, MessageCircle, UserRound, ArrowLeft, Send, Sparkles } from 'lucide-react'

const PROFILES = [
  { id: 'zara', name: 'Zara', age: 29, city: 'Berlin', photo: './avatars/zara.jpg', bio: 'My ideal first date is accidentally becoming regular cafe friends.', interests: ['coffee walks', 'deep talks', 'overthinking'], willMatch: true },
  { id: 'ken', name: 'Ken', age: 31, city: 'Hamburg', photo: './avatars/ken.jpg', bio: 'Together we could overthink one text for forty minutes.', interests: ['board games', 'deep talks', 'platonic lore'], willMatch: true },
  { id: 'lina', name: 'Lina', age: 27, city: 'Cologne', photo: './avatars/lina.jpg', bio: 'I am looking for someone to grab ramen with and not define the relationship.', interests: ['ramen', 'museum days', 'healthy boundaries'], willMatch: false },
  { id: 'ari', name: 'Ari', age: 28, city: 'Berlin', photo: './avatars/ari.jpg', bio: 'Together we could take long walks away from commitment.', interests: ['funny', 'kind', 'friend-shaped'], willMatch: true },
  { id: 'maya', name: 'Maya', age: 26, city: 'Munich', photo: './avatars/maya.jpg', bio: 'My toxic trait is thinking a coffee walk can fix everything.', interests: ['memes', 'museums', 'low pressure'], willMatch: false },
  { id: 'jamie', name: 'Jamie', age: 30, city: 'Leipzig', photo: './avatars/jamie.jpg', bio: 'Looking for someone to send reels to at 2am. Romance optional.', interests: ['late night reels', 'cooking together', 'deep chats'], willMatch: true }
]

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const GLOBAL_PATTERNS = [
  { match: /hello|hi\b|hey\b|howdy|sup|yo\b|heyy/i, responses: ['Hey hey! How is your day going?', 'Hello! I was hoping you would message me.', 'Hey! I am so glad we matched.', 'Hiiii! I was just about to text you first.'] },
  { match: /how are you|how('s| is) it going|what('s| is) up|how('s| is) life/i, responses: ['Honestly? Pretty good. Just had a nice coffee.', 'Living the dream. Platonic dream, but still.', 'Overthinking and thriving, thanks for asking.', 'Doing great! Trying not to text my ex about a meme. Winning so far.'] },
  { match: /what.*doing|what.*up|what.*happening|busy/i, responses: ['Just scrolling and wondering if cereal is a soup.', 'Currently in my feels about a fictional character.', 'Rewatching the same show for comfort. You?', 'Being emotionally available AND free this weekend. Rare combo.'] },
  { match: /where.*live|where.*from|where.*based|hometown/i, responses: ['Berlin! Land of cold brew and emotional unavailability.', 'Hamburg! The city where the weather matches my mood.', 'Currently based in Leipzig. Ask me again next year lol.', 'Cologne! Come for the cathedral, stay for the casual rejection.'] },
  { match: /what.*do\b|work|job|career/i, responses: ['I do something creative that sounds impressive at parties.', 'UX designer. I make things pretty and functional. Like a good situationship.', 'Working in tech. I tell people I am a project manager so they stop asking.', 'Freelance chaos goblin with a side of graphic design.'] },
  { match: /hobby|interest|free time|weekend|into/i, responses: ['I collect hobbies the way other people collect red flags.', 'Honestly? I just rotate between three interests and call it a personality.', 'I am really into pretending I will start a new hobby this weekend.', 'Deep talks and shallow plans. The perfect balance.'] },
  { match: /date|meet|hang out|grab|drink|go out/i, responses: ['A coffee walk is my ideal first date. Low pressure, high caffeine.', 'I was hoping you would ask! Are you free when our schedules align?', 'Only if we can overthink the plan for 45 minutes first.', 'Let me check my calendar. Oh wait, it is just anxiety and free evenings.'] },
  { match: /food|eat|cook|recipe|restaurant|ramen|sushi|pizza|burger/i, responses: ['Ramen is my love language. Second only to memes.', 'I judge people by their pizza toppings. It is a problem.', 'I can cook exactly three meals and I make them my whole personality.', 'Food is the reason I get out of bed. That and spite.'] },
  { match: /travel|vacation|trip|holiday|visit/i, responses: ['I want to travel more but my wallet said "not today".', 'Last trip was to a small town where nothing happened. It was perfect.', 'My travel style is "vaguely plan everything and then wing it."', 'I am one impulse flight away from financial ruin.'] },
  { match: /movie|show|film|watch|netflix|series|binge/i, responses: ['I am currently rotating between three shows and finishing none.', 'Do not get me started on my Letterboxd hot takes.', 'I have strong opinions about fictional characters and I will share them.', 'My watchlist is longer than my ability to commit to anything.'] },
  { match: /music|song|band|concert|playlist|album|listen/i, responses: ['My music taste is best described as "emotional damage".', 'I have a playlist for every possible mood. Yes, including that one.', 'Concerts are the only place I allow myself to feel things publicly.', 'Currently obsessed with an artist you have probably never heard of.'] },
  { match: /book|read|novel|author|literature/i, responses: ['I buy books faster than I read them. It is a problem.', 'Currently reading something that will make me cry on public transport.', 'My Goodreads is embarrassingly accurate about my emotional state.', 'I only read books that make me feel intellectually superior.'] },
  { match: /friend|platonic|friendzone/i, responses: ['Honestly? Best outcome possible.', 'Friendzone is not a prison. It is a premium emotional subscription.', 'I am so here for the friendship-first energy.', 'The friendzone is just a cozy apartment complex I want to live in.'] },
  { match: /love|relationship|romance|commitment/i, responses: ['Let us not get ahead of ourselves. Coffee first, feelings later.', 'I believe in love. I also believe in taking 48 hours to reply to a text.', 'My last relationship taught me a lot. Mostly about myself. And red flags.', 'Commitment is scary. Wanna grab a coffee next month?'] },
  { match: /joke|funny|lol|lmao|haha|hilarious/i, responses: ['I am basically a standup comedian who only performs for group chats.', 'My humor is 90% references and 10% actual wit.', 'Finally someone who appreciates my brand of chaotic comedy.', 'I have been told my humor is an acquired taste. Like olives.'] },
  { match: /cute|sweet|adorable|nice|kind|sweet/i, responses: ['Stop, you are making me emotionally available against my will.', 'That is the nicest thing anyone has said to me since my mom.', 'Are you always this sweet or are you just trying to get a coffee invite?', 'I am blushing. You cannot see it but I am.'] },
  { match: /thanks|thank you|appreciate|grateful/i, responses: ['Of course! Emotional availability is my love language.', 'Anytime. That is what the friendzone is for.', 'You are welcome! I practice being a good conversationalist.'] },
  { match: /sorry|apologize|my bad/i, responses: ['No need to apologize! This is a no-guilt zone.', 'Stop apologizing, you are making the friendzone uncomfortable.', 'It is fine. I once apologized to a plant for forgetting to water it.'] },
  { match: /bye|goodbye|see you|talk later|ttyl|cya/i, responses: ['Bye! Do not forget to send me that meme you mentioned.', 'Talk later! I will be here. Overthinking. As usual.', 'See you! May your texts be delivered and your anxiety be minimal.', 'Ciao! I am already thinking about what to say next time.'] },
  { match: /what.*think|opinion|thoughts|advice/i, responses: ['I think you should trust your gut. Unless your gut is anxious. Then consult a friend.', 'My opinion is that opinions are overrated. But also yes, I have one.', 'Honestly? I think the best move is to go with the flow and overthink afterwards.', 'You want my advice? I once asked a magic 8 ball what to have for dinner.'] },
  { match: /how.*old|age|year/i, responses: ['Old enough to know better, young enough to still make bad decisions.', 'I am in my "vaguely together but still chaotic" era.', 'I stopped counting after 25. Now I just say "late twenties" and hope for the best.'] },
  { match: /drink|beer|wine|cocktail|alcohol|party/i, responses: ['I am more of a tea person, but I will show up for the vibe.', 'I have a complicated relationship with alcohol and an even more complicated one with my bank account.', 'One drink and I become emotionally available. Two drinks and I am planning our friendship anniversary.'] }
]

const FALLBACKS = [
  'Okay but that is genuinely the most relatable thing I have heard all week.',
  'I feel like we would be dangerous together. In a platonic way.',
  'This is going straight in the group chat. You have been warned.',
  'You get it. Most people do not get it.',
  'I am going to need a minute to process how well you worded that.',
  'Why is this the most interesting conversation I have had all week?',
  'This is exactly the kind of energy I needed today.',
  'I feel so seen and I am not sure how to handle it.',
  'Are we the same person? Asking for a friend (me).',
  'Finally someone who gets it. I was starting to lose hope.',
  'Not me catching feelings for a conversation about nothing.',
  'The bar for conversation was low but you brought a shovel.',
  'This feels like the start of a beautiful friendship or a very specific podcast episode.',
  'I have been smiling at my phone like an idiot. People are staring.'
]

const PROFILE_PATTERNS = {
  zara: [
    { match: /coffee|cafe|latte|cappuccino|espresso|brew/i, responses: ['Coffee walks are basically my love language. Platonic love language.', 'I have a favorite cafe for every mood and I take that very seriously.', 'I once walked 40 minutes for a flat white and I would do it again.', 'Coffee is 50% of my personality. The other 50% is overthinking.'] },
    { match: /walk|nature|park|outside|weather/i, responses: ['A walk with good conversation is my ideal afternoon.', 'I love walks because they feel productive but require zero skill.', 'The best conversations happen when you are walking side by side. No eye contact required.', 'I walk to clear my head. And then I overthink while walking.'] },
    { match: /overthink|anxiety|stress|worry|overanalyze/i, responses: ['Overthinking is my cardio. I burn so many calories worrying.', 'I once spent an hour analyzing why my friend used a period instead of an exclamation mark.', 'Overthinking is just my brain trying to keep me safe from embarrassment.', 'I am not overthinking. I am... exploring all possible outcomes.'] },
    { match: /meme|reel|tiktok|post|share|send/i, responses: ['My camera roll is 90% memes and 10% food pictures.', 'I will absolutely send you memes at 2am. Consider yourself warned.', 'The way to my heart is through a well-timed meme.', 'I have a folder of saved memes specifically for new friends.'] }
  ],
  ken: [
    { match: /board game|game|chess|monopoly|cards|gaming/i, responses: ['Board games are my love language. Specifically cooperative ones where nobody fights.', 'I am very competitive but in a "we are all having fun" way.', 'I have a shelf of board games that is starting to look like a hobby.', 'Monopoly ends friendships. Just saying. Let us stick with Catan.'] },
    { match: /deep|philosophy|meaning|existential|think|discuss/i, responses: ['I love a good deep talk. Preferably at 1am with bad lighting.', 'Nothing makes me happier than discussing the meaning of life with a friend.', 'I have been told I ask too many deep questions. I take it as a compliment.', 'Existential dread is just part of my charm at this point.'] },
    { match: /lore|story|plot|narrative|character|arc/i, responses: ['I love a good origin story. Tell me yours.', 'Everyone has lore. I want to hear yours.', 'I am building my personal lore one awkward story at a time.', 'The best part of any friendship is the inside jokes that become lore.'] }
  ],
  ari: [
    { match: /walk|stroll|outside|nature|fresh air|sun/i, responses: ['Long walks are my therapy. Cheaper than actual therapy.', 'I have strong opinions about which parks are best for walking and talking.', 'Walking with no destination is my favorite kind of adventure.', 'The best conversations happen on a walk when nobody is making eye contact.'] },
    { match: /emotion|feel|therapy|mental health|vulnerable|safe/i, responses: ['I am very emotionally available. It scares some people.', 'Therapy taught me that my feelings are valid. And expensive.', 'I love that we can talk about real stuff without it being weird.', 'Emotional intelligence is my favorite trait in a person.'] },
    { match: /funny|humor|joke|comedy|funny|golden retriever|chaotic/i, responses: ['I have been described as a golden retriever in human form.', 'My humor is mostly just saying things that are slightly unhinged.', 'I laugh at my own jokes. That is the confidence you are looking for.', 'Being funny is just my way of coping with the passage of time.'] },
    { match: /friend|connection|bond|friendship/i, responses: ['I value friendship so much. It is the real love story.', 'The best relationships start with "I really like talking to you."', 'I am looking for genuine connection. And snacks.'] }
  ],
  jamie: [
    { match: /reel|meme|tiktok|video|send|share|2am|late night/i, responses: ['I will absolutely send you things at 2am. It is a test of true friendship.', 'My reel game is strong. You have been warned.', 'The best friendships are built on a shared archive of mutual humor.', 'Late night sharing is when the real connection happens.'] },
    { match: /cook|food|recipe|kitchen|meal|bake|cooking/i, responses: ['Cooking together is my ideal hangout. We make food and mess and memories.', 'I have a signature dish that I make for every new friend. It is chili.', 'I love cooking for people. It is my primary love language.', 'My kitchen is small but my ambition is large.'] },
    { match: /romance|love|relationship|feelings|attachment/i, responses: ['Romance is optional. Deep connection is not.', 'I am open to love but I am not looking for it. That is when it finds you.', 'My last relationship taught me that I am actually great at being single.', 'I believe in love. I also believe in not rushing it.'] },
    { match: /night|sleep|bed|dream|insomnia|tired/i, responses: ['I am either asleep at 9pm or awake until 4am. No in between.', 'My sleep schedule is chaos. Send help. Or memes.', 'I do my best thinking at 1am. It is also when I do my worst thinking.', 'I am tired but in a way that is just part of my personality now.'] }
  ]
}

function findResponse(profileId, msg) {
  const profileRules = PROFILE_PATTERNS[profileId]
  if (profileRules) {
    for (const rule of profileRules) {
      if (rule.match.test(msg)) {
        return pickRandom(rule.responses)
      }
    }
  }
  for (const rule of GLOBAL_PATTERNS) {
    if (rule.match.test(msg)) {
      return pickRandom(rule.responses)
    }
  }
  return pickRandom(FALLBACKS)
}

function SwipeCard({ profile, onLike, onPass }) {
  const cardRef = useRef(null)
  const [dragX, setDragX] = useState(0)
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [deciding, setDeciding] = useState(null)

  const startPos = useRef({ x: 0, y: 0 })

  const handlePointerDown = (e) => {
    startPos.current = { x: e.clientX, y: e.clientY }
    setIsDragging(true)
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    const dx = e.clientX - startPos.current.x
    const dy = e.clientY - startPos.current.y
    setDragX(dx)
    setDragY(dy)
    if (dx > 30) setDeciding('like')
    else if (dx < -30) setDeciding('nope')
    else setDeciding(null)
  }

  const handlePointerUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragX > 80) {
      setLeaving('right')
      setTimeout(() => onLike(profile), 300)
    } else if (dragX < -80) {
      setLeaving('left')
      setTimeout(() => onPass(profile), 300)
    } else {
      setDragX(0)
      setDragY(0)
      setDeciding(null)
    }
  }

  const handleButtonSwipe = (dir) => {
    setLeaving(dir)
    setTimeout(() => {
      if (dir === 'right') onLike(profile)
      else onPass(profile)
    }, 300)
  }

  const rot = dragX * 0.06
  const style = leaving
    ? {
        transform: `translateX(${leaving === 'right' ? 600 : -600}px) rotate(${leaving === 'right' ? 20 : -20}deg)`,
        opacity: 0,
        transition: 'transform 0.3s ease, opacity 0.3s ease'
      }
    : {
        transform: `translateX(${dragX}px) rotate(${rot}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease',
        cursor: isDragging ? 'grabbing' : 'grab'
      }

  return (
    <div className="mock-card-wrap" ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      <div className="mock-card" style={style}>
        <div className="mock-card-img">
          <img src={profile.photo} alt={profile.name} />
          {deciding === 'like' && <div className="mock-decision mock-like-tag">LIKE</div>}
          {deciding === 'nope' && <div className="mock-decision mock-nope-tag">NOPE</div>}
        </div>
        <div className="mock-card-info">
          <h3>{profile.name}, {profile.age}</h3>
          <p className="mock-city">{profile.city}</p>
          <p className="mock-bio">{profile.bio}</p>
          <div className="mock-tags">
            {profile.interests.map(t => <span key={t}>{t}</span>)}
          </div>
        </div>
      </div>
      <div className="mock-actions">
        <button className="mock-btn mock-btn-pass" onClick={() => handleButtonSwipe('left')} aria-label="Pass">
          <X size={28} />
        </button>
        <button className="mock-btn mock-btn-like" onClick={() => handleButtonSwipe('right')} aria-label="Like">
          <Heart size={28} />
        </button>
      </div>
    </div>
  )
}

function MatchOverlay({ profile, onKeepSwiping, onMessage }) {
  return (
    <div className="mock-match-overlay">
      <div className="mock-match-card">
        <Sparkles size={40} />
        <h2>It's a Match!</h2>
        <p>You and {profile.name} liked each other</p>
        <div className="mock-match-photos">
          <img src={profile.photo} alt={profile.name} />
        </div>
        <div className="mock-match-actions">
          <button className="mock-btn-primary" onClick={onKeepSwiping}>Keep Swiping</button>
          <button className="mock-btn-secondary" onClick={onMessage}>Send a Message</button>
        </div>
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div className="mock-msg mock-msg-them mock-typing">
      <span className="mock-typing-dot" /><span className="mock-typing-dot" /><span className="mock-typing-dot" />
    </div>
  )
}

function ChatView({ partner, messages, onSend, onBack }) {
  const [input, setInput] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    onSend(partner.id, text)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const chat = messages[partner.id] || []
  const lastMsg = chat[chat.length - 1]
  const isTyping = lastMsg && lastMsg.from === 'me' && chat.filter(m => m.from === 'me').length > chat.filter(m => m.from === 'them').length

  return (
    <div className="mock-chat">
      <div className="mock-chat-header">
        <button className="mock-chat-back" onClick={onBack} aria-label="Back">
          <ArrowLeft size={22} />
        </button>
        <img src={partner.photo} alt={partner.name} />
        <div>
          <strong>{partner.name}</strong>
          <span className="mock-chat-status">{isTyping ? 'Typing...' : 'Online'}</span>
        </div>
      </div>
      <div className="mock-chat-msgs" ref={listRef}>
        {chat.map((msg, i) => (
          <div key={i} className={`mock-msg ${msg.from === 'me' ? 'mock-msg-me' : 'mock-msg-them'}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <TypingDots />}
      </div>
      <div className="mock-chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <button onClick={handleSend} disabled={!input.trim()} aria-label="Send">
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}

export default function AppMock({ onClose }) {
  const [tab, setTab] = useState('swipe')
  const [index, setIndex] = useState(0)
  const [matches, setMatches] = useState([])
  const [showMatch, setShowMatch] = useState(null)
  const [chatPartner, setChatPartner] = useState(null)
  const [messages, setMessages] = useState({})

  const handleLike = useCallback((profile) => {
    if (profile.willMatch) {
      setMatches(prev => {
        if (prev.find(m => m.id === profile.id)) return prev
        return [...prev, profile]
      })
      setShowMatch(profile)
    }
    setIndex(prev => prev + 1)
  }, [])

  const handlePass = useCallback((profile) => {
    setIndex(prev => prev + 1)
  }, [])

  const handleSend = useCallback((profileId, text) => {
    const reply = findResponse(profileId, text)
    setMessages(prev => ({
      ...prev,
      [profileId]: [...(prev[profileId] || []), { from: 'me', text }]
    }))
    setTimeout(() => {
      setMessages(p => ({
        ...p,
        [profileId]: [...(p[profileId] || []), { from: 'them', text: reply }]
      }))
    }, 1000 + Math.random() * 1500)
  }, [])

  const openChat = (profile) => {
    setChatPartner(profile)
    setTab('chat')
  }

  const currentProfile = PROFILES[index]
  const isDone = index >= PROFILES.length

  const renderScreen = () => {
    if (tab === 'chat' && chatPartner) {
      return <ChatView partner={chatPartner} messages={messages} onSend={handleSend} onBack={() => setTab('matches')} />
    }
    if (tab === 'matches') {
      return (
        <div className="mock-matches">
          <div className="mock-matches-header">
            <h2>Matches</h2>
            <p>{matches.length} friend connection{matches.length !== 1 ? 's' : ''}</p>
          </div>
          {matches.length === 0 ? (
            <div className="mock-empty">
              <MessageCircle size={48} />
              <p>No matches yet. Keep swiping!</p>
            </div>
          ) : (
            <div className="mock-match-grid">
              {matches.map(m => (
                <button key={m.id} className="mock-match-item" onClick={() => openChat(m)}>
                  <img src={m.photo} alt={m.name} />
                  <span>{m.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )
    }
    return (
      <div className="mock-swipe">
        <div className="mock-swipe-header">
          <h2>Discover</h2>
          {!isDone && <span className="mock-counter">{index + 1}/{PROFILES.length}</span>}
        </div>
        {isDone ? (
          <div className="mock-empty">
            <UserRound size={48} />
            <h3>You've seen everyone!</h3>
            <p>Check your matches or come back later.</p>
            <button className="mock-btn-primary" onClick={() => { setIndex(0); setMatches([]); setMessages({}) }}>
              Start Over
            </button>
          </div>
        ) : (
          <SwipeCard
            key={currentProfile.id}
            profile={currentProfile}
            onLike={handleLike}
            onPass={handlePass}
          />
        )}
      </div>
    )
  }

  const matchProfile = showMatch ? PROFILES.find(p => p.id === showMatch.id) : null

  return (
    <div className="mock-app">
      <div className="mock-body">
        {renderScreen()}
      </div>
      {tab !== 'chat' && (
        <nav className="mock-tabs">
          <button className={tab === 'swipe' ? 'active' : ''} onClick={() => setTab('swipe')}>
            <UserRound size={22} />
            <span>Discover</span>
          </button>
          <button className={tab === 'matches' ? 'active' : ''} onClick={() => setTab('matches')}>
            <Heart size={22} />
            <span>Matches</span>
            {matches.length > 0 && <sup>{matches.length}</sup>}
          </button>
        </nav>
      )}
      {showMatch && matchProfile && (
        <MatchOverlay
          profile={matchProfile}
          onKeepSwiping={() => setShowMatch(null)}
          onMessage={() => { setShowMatch(null); openChat(matchProfile) }}
        />
      )}
    </div>
  )
}
