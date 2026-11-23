import React, { useState, useEffect } from 'react'
import './App.css'
import TextSummarizer from './components/TextSummarizer'
import NamedEntityRecognizer from './components/NamedEntityRecognizer'
import KeywordExtractor from './components/KeywordExtractor'
import SentimentAnalyzer from './components/SentimentAnalyzer'
import TextSimilarityChecker from './components/TextSimilarityChecker'
import SpamClassifier from './components/SpamClassifier'

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
          <button onClick={() => scrollTo('experience')}>Experience</button>
          <button onClick={() => scrollTo('education')}>Education</button>
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

// Counts only what is listed on this page
const stats = [
  { value: '4', label: 'Production sites' },
  { value: '6', label: 'Live projects' },
  { value: '1 yr', label: 'Backend experience' },
]

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
            Subash Katwal, <span className="blue">Backend &amp; AI Engineer</span>.
          </h1>
          <p className="hero-desc">
            I build backends with Python, Django and PostgreSQL, and AI apps with LangChain, LangGraph and LLM APIs. Previously at Geoneer Geospatial, I built the backends for Examneer and YourCandidate.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}>
              View my work ↗
            </button>
            <a
              href="https://drive.google.com/file/d/1Yfsm0ZYa3obhjABq7Q3tgX3eqVzZEfUI/view?usp=sharing"
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
                View Resume
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
          <dl className="hero-stats">
            {stats.map(s => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hero-right">
          <div className="hero-photo-wrap">
            <img
              src="/images/profile-photo.jpg"
              alt="Subash Katwal"
              className="hero-photo"
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
          <p>I'm a final-year BSc CSIT student at <strong>Tribhuvan University</strong> I spent a year as a backend developer at <strong>Geoneer Geospatial</strong>, where I worked on and delivered production projects from internship to junior role.</p>
          <p>Most of my work is on the server side: designing database schemas, writing REST APIs with Django REST Framework, and getting apps deployed with Docker. I've worked on production sites like Examneer and YourCandidate, and built client projects such as Kitchen Durbar.</p>
          <p>I also build AI projects end to end: prompt chains, LLM integration, agent workflows and the APIs around them. CSIT AI Tutor answers exam questions with LangChain and Groq and streams the answer live, and NPL Adda uses LangGraph agents for its meme captions.</p>
        </div>
      </div>
    </section>
  )
}

// Line-and-dot timeline: hover highlights an entry, click opens its details
function Timeline({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <ol className="timeline">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={item.title + item.org} className={`tl-item${isOpen ? ' open' : ''}`}>
            <span className="tl-dot" aria-hidden="true"></span>
            <button
              type="button"
              className="tl-head"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span>
                <span className="tl-title">{item.title}</span>
                <span className="tl-org">{item.org}</span>
              </span>
              {item.period && <span className="edu-years">{item.period}</span>}
            </button>
            {item.details && (
              <div className="tl-body">
                {Array.isArray(item.details)
                  ? <ul>{item.details.map(d => <li key={d}>{d}</li>)}</ul>
                  : <p>{item.details}</p>}
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}

const experience = [
  {
    title: 'Junior Backend Developer',
    org: 'Geoneer Geospatial Pvt. Ltd.',
    period: 'Jan 2026 - Oct 2026',
    details: [
      'Built and maintained the backends of production apps, including Examneer.com and YourCandidate.info.',
      'Wrote REST APIs and worked with the frontend team to integrate them.',
      'Designed database schemas and handled migrations and data fixes.',
      'Took client requirements and turned them into working features with the team.',
    ],
  },
  {
    title: 'Backend Development Intern',
    org: 'Geoneer Geospatial Pvt. Ltd.',
    period: 'Nov 2025 - Jan 2026',
    details: [
      'Three-month internship on the backend team.',
      'Learned the team codebase and workflow with Django and REST APIs.',
      'Worked on API endpoints, database models and bug fixes alongside senior developers.',
    ],
  },
]

function Experience() {
  return (
    <section className="experience section-light" id="experience">
      <div className="section-inner two-col">
        <div className="section-label-col">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Click a role to see what I worked on.</p>
        </div>
        <Timeline items={experience} />
      </div>
    </section>
  )
}

const education = [
  {
    title: 'B.Sc. Computer Science & IT (CSIT)',
    org: 'Tribhuvan University',
    period: '2079 - Present',
    details: 'Currently in my final year.',
  },
  {
    title: 'Higher Secondary (+2), Science - Biology',
    org: 'VS Niketan School',
  },
  {
    title: 'Secondary Education (Class 10)',
    org: 'Sahara National School',
  },
]

function Education() {
  return (
    <section className="education" id="education">
      <div className="section-inner two-col">
        <div className="section-label-col">
          <h2 className="section-title">Education</h2>
        </div>
        <Timeline items={education} />
      </div>
    </section>
  )
}

// Projects - every link checked (HTTP 200). Professional sites have no public repo.
const professionalProjects = [
  {
    name: 'Examneer',
    type: 'Exam Preparation Platform · Geoneer Geospatial',
    desc: 'Online exam preparation platform. I worked on the backend: API endpoints, database models and keeping the production app running.',
    tags: ['Backend', 'REST APIs', 'Database'],
    image: '/images/project-examneer.jpg',
    live: 'https://examneer.com',
  },
  {
    name: 'New Summit College',
    type: 'College Website',
    desc: 'Website for New Summit College. I handled the backend side of the site and its content.',
    tags: ['Backend', 'Web'],
    image: '/images/project-newsummit.jpg',
    live: 'https://newsummit.edu.np',
  },
  {
    name: 'YourCandidate',
    type: 'Candidate Information Platform · Geoneer Geospatial',
    desc: 'Platform for looking up candidate information. I worked on its backend APIs and data handling.',
    tags: ['Backend', 'REST APIs', 'Database'],
    live: 'https://yourcandidate.info',
  },
  {
    name: 'Kitchen Durbar',
    type: 'Client Project · Commercial Kitchen Store',
    desc: 'Storefront for commercial kitchen equipment. JWT and Google sign-in, email OTP for signup and password reset, product search and filters, orders priced on the server, an admin dashboard and WhatsApp checkout.',
    tags: ['Django REST Framework', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Nginx'],
    image: '/images/project-kitchen-durbar.jpg',
    live: 'https://kitchen-durbar-frontend.onrender.com/',
    repo: 'https://github.com/subashkatwal/kitchen-durbar',
  },
]

const personalProjects = [
  {
    name: 'CSIT AI Tutor',
    type: 'AI Study Assistant',
    desc: 'Study helper for TU CSIT 7th semester. It detects the subject and topic of a question, streams a step-by-step answer, rates exam relevance and creates practice questions. Limited to 3 questions per day.',
    tags: ['FastAPI', 'LangChain', 'Groq', 'Server-Sent Events', 'Render'],
    image: '/images/agentic-ai.jpeg',
    live: 'https://csit-ai-tutor.onrender.com/',
    repo: 'https://github.com/subashkatwal/csit-ai-tutor',
  },
  {
    name: 'NPL Adda',
    type: 'Nepal Premier League Fan Platform',
    desc: 'Fan site for the Nepal Premier League with team pages, 2026 fixtures, match predictions with a leaderboard, and a meme lab with AI captions. Google sign-in, images on Cloudinary.',
    tags: ['Django REST Framework', 'LangGraph', 'PostgreSQL', 'Redis', 'React', 'Docker'],
    image: '/images/project-npl-adda.jpg',
    live: 'https://npl-adda.onrender.com/',
    repo: 'https://github.com/subashkatwal/NPL-Adda',
  },
]

function ProjectCard({ p }) {
  const initials = p.name.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <div className="project-card">
      <div className="project-img">
        {p.image
          ? <img src={p.image} alt={p.name} className="project-thumb" />
          : <div className="project-thumb project-mono" aria-hidden="true">{initials}</div>}
      </div>
      <div className="project-info">
        <h3 className="project-name">{p.name}</h3>
        <p className="project-type">{p.type}</p>
        <p className="project-desc">{p.desc}</p>
        <div className="tags">
          {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
        </div>
        <div className="project-links">
          <a className="project-btn" href={p.live} target="_blank" rel="noreferrer">Live demo ↗</a>
          {p.repo && <a className="project-btn ghost" href={p.repo} target="_blank" rel="noreferrer">GitHub ↗</a>}
        </div>
      </div>
    </div>
  )
}

function Work() {
  return (
    <section className="work" id="work">
      <div className="section-inner">
        <div className="work-header">
          <h2 className="section-title">Professional work</h2>
          <a href="https://github.com/subashkatwal" target="_blank" rel="noreferrer" className="github-link">
            All projects on GitHub ↗
          </a>
        </div>
        <div className="projects-list">
          {professionalProjects.map(p => <ProjectCard key={p.name} p={p} />)}
        </div>
        <div className="work-header work-sub">
          <h2 className="section-title">Personal projects</h2>
        </div>
        <div className="projects-list">
          {personalProjects.map(p => <ProjectCard key={p.name} p={p} />)}
        </div>
      </div>
    </section>
  )
}

// Skills
const skillGroups = [
  { title: 'Backend', items: ['Python', 'Django', 'Django REST Framework', 'FastAPI', 'REST APIs', 'JWT'] },
  { title: 'Databases', items: ['PostgreSQL', 'SQL Server', 'Redis', 'SQL'] },
  { title: 'AI Engineering', items: ['LangChain', 'LangGraph', 'LLM APIs (Groq, Gemini)', 'AI Agents', 'Prompt Design', 'Scikit-learn', 'NLP'] },
  { title: 'Tools', items: ['Git', 'Docker', 'Nginx', 'Render', 'React', 'Linux'] },
]

function Skills() {
  return (
    <section className="skills section-light" id="skills">
      <div className="section-inner two-col">
        <div className="section-label-col">
          <h2 className="section-title">Skills &amp; tools</h2>
          <p className="section-subtitle">What I use day to day.</p>
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
              Small NLP tools that run in the browser.
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
              Rule-based and statistical techniques written from scratch.
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
        <h2 className="contact-title">
          Need a backend built? <span className="blue">Let's talk.</span>
        </h2>
        <p className="contact-sub">Open to backend and AI engineering roles, API work and freelance projects.</p>
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
          <a href="https://github.com/subashkatwal" target="_blank" rel="noreferrer" className="github-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            github.com/subashkatwal
          </a>
        </div>
      </div>
      <div className="site-footer">
        © 2026 Subash Katwal. Built in Kathmandu.
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
      <Work />
      <Experience />
      <Education />
      <Skills />
      <MiniProjects />
      <ClassicalML />
      <Contact />
    </>
  )
}
