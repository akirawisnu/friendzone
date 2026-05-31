import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Heart, X, MessageCircle, UserRound, ArrowLeft, Send, Sparkles } from 'lucide-react'
import { PROFILES } from './mockData/profiles.js'
import { GLOBAL_PATTERNS, FALLBACKS, FIRST_MESSAGES, ARCHETYPE_PATTERNS, findResponse } from './mockData/patterns.js'

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
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

function PledgeBanner() {
  return (
    <div className="mock-pledge">
      <Sparkles size={16} />
      <span>I pledge not to ghost. I will reply within 24 hours or send a cat gif as apology.</span>
    </div>
  )
}

function ChatView({ partner, messages, onSend, onBack, pledgeShown }) {
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

  return (
    <div className="mock-chat">
      <div className="mock-chat-header">
        <button className="mock-chat-back" onClick={onBack} aria-label="Back">
          <ArrowLeft size={22} />
        </button>
        <img src={partner.photo} alt={partner.name} />
        <div>
          <strong>{partner.name}</strong>
          <span className="mock-chat-status">Online</span>
        </div>
      </div>
      {pledgeShown && <PledgeBanner />}
      <div className="mock-chat-msgs" ref={listRef}>
        {chat.map((msg, i) => (
          <div key={i} className={`mock-msg ${msg.from === 'me' ? 'mock-msg-me' : 'mock-msg-them'}`}>
            {msg.text}
          </div>
        ))}
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
  const [pledgeDone, setPledgeDone] = useState({})

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
    const profile = PROFILES.find(p => p.id === profileId)
    const reply = findResponse(text, profile?.archetype)
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
    if (!pledgeDone[profile.id]) {
      setPledgeDone(prev => ({ ...prev, [profile.id]: true }))
    }
    const existing = messages[profile.id] || []
    if (existing.length === 0 && Math.random() < 0.35) {
      const firstMsg = pickRandom(FIRST_MESSAGES)
      setTimeout(() => {
        setMessages(p => ({
          ...p,
          [profile.id]: [{ from: 'them', text: firstMsg }]
        }))
      }, 500 + Math.random() * 1000)
    }
  }

  const currentProfile = PROFILES[index]
  const isDone = index >= PROFILES.length

  const renderScreen = () => {
    if (tab === 'chat' && chatPartner) {
      return <ChatView partner={chatPartner} messages={messages} onSend={handleSend} onBack={() => setTab('matches')} pledgeShown={pledgeDone[chatPartner.id]} />
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
            <button className="mock-btn-primary" onClick={() => { setIndex(0); setMatches([]); setMessages({}); setPledgeDone({}) }}>
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
