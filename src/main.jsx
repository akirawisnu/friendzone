import React from 'react'
import { createRoot } from 'react-dom/client'
import { HeartHandshake, MessageCircle, ShieldCheck, Coffee, UserRoundCheck, Sparkles, MapPin, LockKeyhole, Ghost, BadgeCheck, Smile, ArrowRight, CalendarCheck, Star, Users, Quote, CheckCircle2 } from 'lucide-react'
import './styles.css'

const profiles = [
  {
    name: 'Zara',
    detail: '29, Berlin',
    prompt: 'My ideal first date is accidentally becoming regular cafe friends.',
    badges: ['coffee walks', 'soft rejection', 'sends reels'],
    score: '97%',
    note: 'Romantic chemistry: pending',
    avatar: './avatars/zara.jpg'
  },
  {
    name: 'Ken',
    detail: '31, Hamburg',
    prompt: 'Together we could overthink one text for forty minutes.',
    badges: ['board games', 'deep talks', 'platonic lore'],
    score: '94%',
    note: 'Friendship potential: dangerously high',
    avatar: './avatars/ken.jpg'
  },
  {
    name: 'Lina',
    detail: '27, Cologne',
    prompt: 'I am looking for someone to grab ramen with and not define the relationship.',
    badges: ['ramen', 'museum days', 'healthy boundaries'],
    score: '92%',
    note: 'Commitment detected: to brunch',
    avatar: './avatars/lina.jpg'
  }
]

const steps = [
  ['Choose your damage level', 'Pick friendship-only, slow-burn, or “I am emotionally brave on weekdays only.”'],
  ['Match on actual vibes', 'We compare interests, humor, comfort zones, and ability to survive a slightly awkward coffee.'],
  ['Get gently rejected', 'The app turns “you are nice, but...” into a calendar invite, meme thread, or walking buddy plan.'],
  ['Keep the friend', 'After the meetup, both people confirm if the vibe was safe, fun, and non-catastrophic.']
]

const screenCards = [
  {
    title: 'Daily Match',
    kicker: 'Not a soulmate. Maybe better.',
    content: (
      <>
        <div className="photo-panel"><img src="./avatars/zara.jpg" alt="Zara" /></div>
        <div className="screen-row">
          <div><strong>Zara</strong><span>Berlin • 2 km away</span></div>
          <b>97%</b>
        </div>
        <p className="screen-quote">“My toxic trait is thinking a coffee walk can fix society.”</p>
        <div className="pill-row"><span>memes</span><span>museums</span><span>low pressure</span></div>
      </>
    )
  },
  {
    title: 'The Gentle No',
    kicker: 'Rejection, but make it UX.',
    content: (
      <>
        <div className="message left">You seem really cool.</div>
        <div className="message right">Thank you, I have been practicing.</div>
        <div className="message left">I feel more friend energy?</div>
        <div className="suggestion">Suggested reply: “Honestly, elite outcome.”</div>
      </>
    )
  },
  {
    title: 'Friend Plan',
    kicker: 'Romance optional. Snacks required.',
    content: (
      <>
        <div className="plan-card"><CalendarCheck size={19}/><div><strong>Saturday cafe walk</strong><span>Public place • 45 minutes</span></div></div>
        <div className="plan-card"><ShieldCheck size={19}/><div><strong>Comfort check-in</strong><span>Enabled after meetup</span></div></div>
        <div className="plan-card"><Ghost size={19}/><div><strong>No ghosting pledge</strong><span>Send a kind exit note</span></div></div>
      </>
    )
  }
]

function Header(){
  return <header className="site-header">
    <a className="brand" href="#home" aria-label="Friendzone home">
      <span className="brand-mark"><HeartHandshake size={21}/></span>
      <span>Friendzone</span>
    </a>
    <nav>
      <a href="#how">How it works</a>
      <a href="#screens">Screens</a>
      <a href="#safety">Safety</a>
      <a href="#faq">FAQ</a>
    </nav>
    <a className="nav-cta" href="#download">Enter the Friendzone</a>
  </header>
}

function PhoneMock(){
  return <div className="phone-shell" aria-label="Friendzone app preview">
    <div className="phone-notch" />
    <div className="phone-screen">
      <div className="app-top"><span>Friendzone</span><BadgeCheck size={18}/></div>
      <div className="profile-card">
        <div className="profile-photo"><img src="./avatars/ari.jpg" alt="Ari" /></div>
        <div className="profile-meta"><div><h3>Ari</h3><p>28 • Berlin</p></div><strong>95%</strong></div>
        <p className="prompt">“Together we could take long walks away from commitment.”</p>
        <div className="profile-tags"><span>funny</span><span>kind</span><span>friend-shaped</span></div>
      </div>
      <div className="app-actions"><button>No sparks</button><button>Still send memes</button></div>
      <div className="tiny-status">Relationship status: buffering friendship...</div>
    </div>
  </div>
}

function Hero(){
  return <section id="home" className="hero">
    <div className="hero-copy">
      <p className="eyebrow"><Sparkles size={16}/> A dating app with realistic outcomes</p>
      <h1>The dating app designed to get you friendzoned.</h1>
      <p className="lead">Meet people who might reject you romantically, but will absolutely send memes, grab coffee, and become emotionally available friends.</p>
      <div className="hero-actions">
        <a className="primary" href="#screens">See how rejection works <ArrowRight size={18}/></a>
        <a className="secondary" href="#how">Read the manifesto</a>
      </div>
      <div className="proof">
        <span><b>0%</b> pressure to be mysterious</span>
        <span><b>98%</b> chance of a nice walk</span>
        <span><b>1</b> emotionally mature exit button</span>
      </div>
    </div>
    <PhoneMock />
  </section>
}

function Manifesto(){
  return <section className="manifesto">
    <Quote size={28}/>
    <h2>Modern dating is exhausting. Friendzone asks a braver question: what if the worst case scenario is a new friend?</h2>
    <p>It looks professional because your feelings deserve good design. The jokes are hidden because your coping mechanism deserves product-market fit.</p>
  </section>
}

function How(){
  return <section id="how" className="section">
    <div className="section-head"><p className="eyebrow">How it works</p><h2>From match to “you are like a sibling to me” in four elegant steps.</h2></div>
    <div className="step-grid">{steps.map(([title, text], i)=><article className="step" key={title}>
      <span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{text}</p>
    </article>)}</div>
  </section>
}

function Screens(){
  return <section id="screens" className="section muted">
    <div className="section-head center"><p className="eyebrow">App screenshots</p><h2>Premium app screens, suspiciously honest copy.</h2><p>Designed to feel credible at first glance, then slowly reveal that romance is losing to brunch.</p></div>
    <div className="screens-grid">{screenCards.map(card=><div className="mini-phone" key={card.title}>
      <div className="mini-top"><span>{card.title}</span><small>{card.kicker}</small></div>
      <div className="mini-body">{card.content}</div>
    </div>)}</div>
  </section>
}

function Profiles(){
  return <section className="section">
    <div className="section-head"><p className="eyebrow">Matches</p><h2>People you could date, but statistically will recommend a podcast to.</h2></div>
    <div className="profile-grid">{profiles.map(p=><article className="match-card" key={p.name}>
      <div className="match-top"><img className="match-avatar" src={p.avatar} alt={p.name} /><div><h3>{p.name}</h3><p><MapPin size={14}/>{p.detail}</p></div><strong>{p.score}</strong></div>
      <p className="match-prompt">{p.prompt}</p>
      <div className="pill-row">{p.badges.map(b=><span key={b}>{b}</span>)}</div>
      <footer>{p.note}</footer>
    </article>)}</div>
  </section>
}

function Safety(){
  const items = [
    [ShieldCheck, 'Clear intentions', 'Friendship-first, slow-burn, and dating modes are visible before the first message.'],
    [LockKeyhole, 'Privacy by default', 'Approximate location, safe meetup suggestions, and optional check-ins keep things grounded.'],
    [MessageCircle, 'Kind exits', 'Built-in scripts help people say “not romantic” without disappearing into the void.']
  ]
  return <section id="safety" className="section dark">
    <div className="section-head center"><p className="eyebrow">Safety</p><h2>Because rejection is fine. Chaos is not.</h2></div>
    <div className="safety-grid">{items.map(([Icon,title,text])=><article key={title}><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div>
  </section>
}

function CTA(){
  return <section id="download" className="cta">
    <div><p className="eyebrow">Launch concept</p><h2>Ready to enter the Friendzone?</h2><p>Join the only app where “I see you as a friend” counts as successful onboarding.</p></div>
    <a className="primary light" href="#home">Start platonically <ArrowRight size={18}/></a>
  </section>
}

function FAQ(){
  const faqs = [
    ['Is this a real dating app?', 'This is a polished fictional product concept. Emotionally, however, the friendzone is very real.'],
    ['Is it anti-romance?', 'No. It just accepts that romance sometimes needs to pass through memes, coffee, and mild vulnerability first.'],
    ['What is the guarantee?', 'The promise is simple: even if sparks fail, the app tries to leave you with a friend, not a confusing situationship.'],
    ['Why does it look so serious?', 'Because the best jokes are delivered with excellent spacing, tasteful typography, and a legally distinct color palette.']
  ]
  return <section id="faq" className="section faq">
    <div className="section-head center"><p className="eyebrow">FAQ</p><h2>Questions people ask before being politely redirected to friendship.</h2></div>
    <div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<Star size={16}/></summary><p>{a}</p></details>)}</div>
  </section>
}

function Footer(){
  return <footer className="footer">
    <div className="footer-brand"><HeartHandshake size={18}/> Friendzone</div>
    <p>Dating app energy. Friendship outcome.</p>
    <a className="credit" href="https://akirawisnu.github.io" target="_blank" rel="noreferrer">created by akirawisnu</a>
  </footer>
}

function App(){
  return <><Header/><main><Hero/><Manifesto/><How/><Screens/><Profiles/><Safety/><CTA/><FAQ/></main><Footer/></>
}

createRoot(document.getElementById('root')).render(<App />)
