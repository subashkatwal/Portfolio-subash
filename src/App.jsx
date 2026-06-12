import React, { useState, useEffect } from 'react'
import './App.css'
import TextSummarizer from './components/TextSummarizer'
import NamedEntityRecognizer from './components/NamedEntityRecognizer'
import KeywordExtractor from './components/KeywordExtractor'
import SentimentAnalyzer from './components/SentimentAnalyzer'
import TextSimilarityChecker from './components/TextSimilarityChecker'
import SpamClassifier from './components/SpamClassifier'
const PlaceholderImg = ({ width, height, text, style }) => (
  <div style={{
    width: width || '100%',
    height: height || '100%',
    background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    fontSize: '13px',
    fontWeight: '500',
    borderRadius: style?.borderRadius || '0',
    ...style
  }}>
    {text || 'Photo'}
  </div>
)

// Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <span className="nav-logo">Subash Katwal</span>
        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('work')}>Work</button>
          <button onClick={() => scrollTo('miniprojects')}>Demos</button>
          <button onClick={() => scrollTo('skills')}>Skills</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
        </div>
        <button className="hire-btn" onClick={() => scrollTo('contact')}>Hire me</button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-left">
          <div className="available-badge">
            <span className="badge-dot"></span>
            Available for opportunities
          </div>
          <h1 className="hero-title">
            Hi, I'm Subash - <span className="blue">AI &amp; ML Engineer</span> building intelligent systems.
          </h1>
          <p className="hero-desc">
            I design and ship deep-learning, NLP, and full-stack applications. Currently based in Kathmandu, Nepal - passionate about agentic AI and data-driven products.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}>
              View my work ↗
            </button>
           <a 
            href="https://drive.google.com/file/d/1n3pPCZkr3LvLDryQQi8bvsgvdhJn9Bi6/view?usp=drive_link" 
            target="_blank" 
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </button>
          </a>
          </div>
          <div className="social-links">
            <a href="https://github.com/subashkatwal" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="https://linkedin.com/in/subashkatwal" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="mailto:subashkatwal112@gmail.com" aria-label="Email">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </div>
        <div className="hero-right">
        <div className="hero-photo-wrap">
          <img
            src="/images/profile-pic.jpeg"
            alt="Profile"
            style={{
              borderRadius: '16px',
              width: '280px',
              height: '340px',
              objectFit: 'cover'
            }}
          />
        </div>
</div>
      </div>
    </section>
  )
}

// About
function About() {
  return (
    <section className="about section-light" id="about">
      <div className="section-inner two-col">
        <div className="section-label-col">
          <h2 className="section-title">A bit about me</h2>
        </div>
        <div className="section-content-col">
          <p>I'm a Computer Science student at <strong>Tribhuvan University</strong> and a self-taught engineer obsessed with the place where software starts to reason.</p>
          <p>I've shipped full-stack apps with React, Django, and SQL Server, and explored ML across travel assistants, book recommenders, word-prediction tools, and multi-agent AI platforms.</p>
          <p>I read papers on weekends, write code most evenings, and share most of what I build on GitHub. Right now I'm deep into agentic systems and the engineering craft behind them.</p>
        </div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section className="education" id="education">
      <div className="section-inner two-col">
        <div className="section-label-col">
          <h2 className="section-title">Academic background</h2>
        </div>
        <div className="edu-list">
          <div className="edu-card">
            <div className="edu-top">
              <div>
                <h3 className="edu-name">Tribhuvan University</h3>
                <p className="edu-degree">B.Sc. Computer Science &amp; IT (CSIT)</p>
                <p className="edu-loc">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Kathmandu, Nepal
                </p>
              </div>
              <span className="edu-years">2022 - Present</span>
            </div>
          </div>
          <div className="edu-card">
            <div className="edu-top">
              <div>
                <h3 className="edu-name">NEB</h3>
                <p className="edu-degree">+2 Science · GPA 3.70 / 4.0</p>
                <p className="edu-loc">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Kathmandu, Nepal
                </p>
              </div>
              <span className="edu-years">2020 - 2022</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


const projects = [
  {
    year: '2025',
    name: 'Global Mitra',
    type: 'Travel Safety & Incident Alert Platform',
    desc: 'Full-stack travel safety platform for tourists and trekking guides in Nepal. Users report real-time hazards - landslides, floods, road blocks - and an AI engine using TF-IDF + DBSCAN clusters reports, filters false alarms, and auto-broadcasts verified alerts.',
    tags: ['Django', 'React', 'scikit-learn', 'DBSCAN', 'TF-IDF', 'SQL Server', 'Docker', 'JWT'],
    image: '/images/NTA.jpg',
    link: 'https://github.com/subashkatwal/global-mitra',
  },
  {
    year: '202',
    name: 'EventHub',
    type: 'Event Management System',
    desc: 'A full-stack event platform with smart calendar, ticketing, and a frictionless user registration flow.',
    tags: ['React', 'Django', 'Python', 'PostgreSQL'],
    image: '/images/event.jpg',
    link: 'https://github.com/subashkatwal',
  },
  {
    year: '2025',
    name: 'CSIT AI Tutor',
    type: 'AI-Powered Study Assistant',
    desc: 'A TU CSIT-focused AI tutor that identifies the subject and topic of any question, gives structured step-by-step explanations aligned with exam patterns, rates exam relevance, generates practice questions with answers, and streams real-time progress updates.',
    tags: ['FastAPI', 'Uvicorn', 'LangChain', 'Groq', 'HTML', 'CSS', 'JavaScript', 'Render'],
    image: '/images/agentic-ai.jpeg',
    link: 'https://csit-ai-tutor.onrender.com/',
  },
]

function Work() {
  return (
    <section className="work" id="work">
      <div className="section-inner">
        <div className="work-header">
          <div>
            <h2 className="section-title">Featured projects</h2>
          </div>
          <a href="https://github.com/subashkatwal" target="_blank" rel="noreferrer" className="github-link">
            All projects on GitHub ↗
          </a>
        </div>
        <div className="projects-list">
          {projects.map((p, i) => (
            <a
              className="project-card"
              key={i}
              href={p.link}
              target="_blank"
              rel="noreferrer"
            >
              <div className="project-img">
                {p.image
                  ? <img src={p.image} alt={p.name} style={{ width: '220px', height: '140px', borderRadius: '10px', objectFit: 'cover', display: 'block' }} />
                  : <PlaceholderImg text={p.name} style={{ borderRadius: '10px', width: '220px', height: '140px' }} />
                }
              </div>
              <div className="project-info">
                <span className="project-year">{p.year}</span>
                <h3 className="project-name">{p.name}</h3>
                <p className="project-type">{p.type}</p>
                <p className="project-desc">{p.desc}</p>
                <div className="tags">
                  {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
              <span className="project-arrow" aria-label="View project">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// Skills
const skillGroups = [
  {
    title: 'Languages',
    items: ['Python', 'C','JavaScript', 'TypeScript', 'SQL', 'R'],
  },
  {
    title: 'AI / ML',
    items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Deep Learning'],
  },
  {
    title: 'Frameworks',
    items: ['Django', 'React', 'FastAPI', 'Node.js'],
  },
  {
    title: 'Tools',
    items: ['Git', 'Docker', 'SQL Server', 'Figma', 'Linux'],
  },
]

function Skills() {
  return (
    <section className="skills section-light" id="skills">
      <div className="section-inner two-col">
        <div className="section-label-col">
          <h2 className="section-title">Skills &amp; tools</h2>
          <p className="section-subtitle">The technologies I reach for when shipping real products.</p>
        </div>
        <div className="skills-grid">
          {skillGroups.map(g => (
            <div className="skill-card" key={g.title}>
              <h4 className="skill-group-title">{g.title}</h4>
              <div className="skill-tags">
                {g.items.map(s => <span className="skill-tag" key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Mini Projects
const MINI_TABS = [
  { id: 'summarizer', label: '📝 Summarizer',         component: TextSummarizer },
  { id: 'ner',        label: '🔍 Entity Recognizer',   component: NamedEntityRecognizer },
  { id: 'keywords',   label: '🏷️ Keyword Extractor',  component: KeywordExtractor },
]

function MiniProjects() {
  const [active, setActive] = useState('summarizer')
  const ActiveTool = MINI_TABS.find(t => t.id === active).component
  return (
    <section className="mini-projects" id="miniprojects">
      <div className="section-inner">
        <div className="mp-header">
          <div>
            <h2 className="section-title">Live NLP Demos</h2>
            <p className="section-subtitle" style={{ marginTop: '8px' }}>
              Interactive NLP tools - try them right here, no install needed.
            </p>
          </div>
        </div>
        <div className="mp-tabs">
          {MINI_TABS.map(t => (
            <button
              key={t.id}
              className={`mp-tab${active === t.id ? ' active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="mp-panel">
          <ActiveTool />
        </div>
      </div>
    </section>
  )
}

const CLASSICAL_TABS = [
  { id: 'sentiment',  label: '💬 Sentiment Analyzer',  component: SentimentAnalyzer },
  { id: 'similarity', label: '🔁 Similarity Checker',   component: TextSimilarityChecker },
  { id: 'spam',       label: '📨 Spam Classifier',       component: SpamClassifier },
]

function ClassicalML() {
  const [active, setActive] = useState('sentiment')
  const ActiveTool = CLASSICAL_TABS.find(t => t.id === active).component
  return (
    <section className="mini-projects" id="classicalml">
      <div className="section-inner">
        <div className="mp-header">
          <div>
            <h2 className="section-title">Classical ML Demos</h2>
            <p className="section-subtitle" style={{ marginTop: '8px' }}>
              Rule-based and statistical ML techniques implemented from scratch.
            </p>
          </div>
        </div>
        <div className="mp-tabs">
          {CLASSICAL_TABS.map(t => (
            <button
              key={t.id}
              className={`mp-tab${active === t.id ? ' active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="mp-panel">
          <ActiveTool />
        </div>
      </div>
    </section>
  )
}

// Contact
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <p className="contact-label"></p>
        <h2 className="contact-title">
          Have a project in mind? <span className="blue">Let's build it.</span>
        </h2>
        <p className="contact-sub">Open to opportunities, collaborations, and interesting conversations about AI.</p>
        <a href="mailto:subashkatwal112@gmail.com" className="email-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          subashkatwal112@gmail.com
        </a>
        <div className="contact-footer">
          <span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.45 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +977 9749459199
          </span>
          <span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Kathmandu, Nepal
          </span>
          <a 
  href="https://github.com/subashkatwal" 
  target="_blank" 
  rel="noreferrer"
  className="github-link"
>
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
  github.com/subashkatwal
</a>
        </div>
      </div>
      <div className="site-footer">
        © 2026 Subash Katwal. Compiled in Kathmandu. Trained on caffeine, fine-tuned on logic.
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Work />
      <Skills />
      <MiniProjects />
      <ClassicalML />
      <Contact />
    </>
  )
}
