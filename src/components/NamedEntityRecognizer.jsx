import React, { useState } from 'react'

// Rule-based NER- no backend needed
const PERSON_TITLES = new Set(['mr','mrs','ms','dr','prof','sir','president','pm','ceo','founder'])
const ORG_SUFFIXES = new Set(['inc','ltd','llc','corp','co','university','institute','foundation','organization','association','agency','department','ministry','bank','group','technologies','tech','labs','ai','systems'])
const GEO_KEYWORDS = new Set(['nepal','india','china','usa','uk','america','europe','asia','africa','australia','kathmandu','delhi','london','paris','beijing','tokyo','york','angeles','francisco','seattle','boston','chicago'])
const MONTHS = new Set(['january','february','march','april','may','june','july','august','september','october','november','december','jan','feb','mar','apr','jun','jul','aug','sep','oct','nov','dec'])

function nerTag(text) {
  const tokens = text.split(/(\s+|[,;:()\[\]"']|\.\s|\.$)/)
  const result = []
  let i = 0

  while (i < tokens.length) {
    const tok = tokens[i]
    const word = tok.trim()
    const lower = word.toLowerCase()

    if (!word || /^\s+$/.test(tok)) { result.push({ text: tok, type: null }); i++; continue }

    // DATE: number + month or month + number
    if (MONTHS.has(lower)) {
      result.push({ text: tok, type: 'DATE' }); i++; continue
    }
    if (/^\d{4}$/.test(word)) {
      result.push({ text: tok, type: 'DATE' }); i++; continue
    }

    // LOCATION
    if (GEO_KEYWORDS.has(lower)) {
      result.push({ text: tok, type: 'LOC' }); i++; continue
    }

    // ORG- ends with known suffix or is all-caps acronym 3+ chars
    if (ORG_SUFFIXES.has(lower) || (/^[A-Z]{2,}$/.test(word) && word.length >= 2 && word.length <= 6)) {
      result.push({ text: tok, type: 'ORG' }); i++; continue
    }

    // Multi-word ORG: Title-Case Word + org suffix next
    if (/^[A-Z][a-z]+$/.test(word)) {
      const next = tokens[i + 2]?.trim().toLowerCase()
      if (next && ORG_SUFFIXES.has(next)) {
        result.push({ text: tok, type: 'ORG' }); i++; continue
      }
    }

    // PERSON: preceded by title OR two consecutive Title-Case words
    if (/^[A-Z][a-z]+$/.test(word)) {
      const prev = result.filter(r => r.text.trim()).slice(-1)[0]
      const prevLower = prev?.text.trim().toLowerCase().replace(/\.$/, '')
      const next = tokens[i + 2]?.trim()

      if (PERSON_TITLES.has(prevLower)) {
        result.push({ text: tok, type: 'PERSON' }); i++; continue
      }
      if (prev?.type === 'PERSON' && /^[A-Z][a-z]+$/.test(next || '')) {
        result.push({ text: tok, type: 'PERSON' }); i++; continue
      }
      if (prev?.type === 'PERSON') {
        result.push({ text: tok, type: 'PERSON' }); i++; continue
      }
      // Next word is also Title-Case- could be name
      if (/^[A-Z][a-z]+$/.test(next || '') && !ORG_SUFFIXES.has(next?.toLowerCase() || '')) {
        result.push({ text: tok, type: 'PERSON' }); i++; continue
      }
    }

    result.push({ text: tok, type: null })
    i++
  }

  return result
}

const TYPE_STYLES = {
  PERSON: { bg: '#dbeafe', color: '#1e40af', label: 'PERSON' },
  ORG:    { bg: '#fef3c7', color: '#92400e', label: 'ORG' },
  LOC:    { bg: '#dcfce7', color: '#166534', label: 'LOC' },
  DATE:   { bg: '#f3e8ff', color: '#6b21a8', label: 'DATE' },
}

const EXAMPLE = `Dr. Elon Musk, CEO of Tesla Inc and founder of SpaceX, announced in January 2024 that the company plans to expand operations to India and Nepal. Meanwhile, Prof. Geoffrey Hinton from the University of Toronto- often called the godfather of deep learning- spoke at the MIT AI Conference in Boston. OpenAI, Google, and Microsoft have all increased investment in large language models. The United Nations released a report in March warning that AI regulation must be addressed by 2025.`

export default function NamedEntityRecognizer() {
  const [input, setInput] = useState('')
  const [tokens, setTokens] = useState(null)

  const handleAnalyze = () => {
    if (!input.trim()) return
    setTokens(nerTag(input))
  }

  const counts = tokens ? Object.fromEntries(
    ['PERSON','ORG','LOC','DATE'].map(t => [t, tokens.filter(x => x.type === t).length])
  ) : null

  return (
    <div className="mp-tool">
      <div className="mp-tool-header">
        <span className="mp-tool-icon">🔍</span>
        <div>
          <h3 className="mp-tool-title">Named Entity Recognizer</h3>
          <p className="mp-tool-desc">Rule-based NER- highlights people, organizations, locations, and dates in any text.</p>
        </div>
      </div>

      <div className="mp-examples">
        <span className="mp-ex-label">Try example:</span>
        <button className="mp-ex-btn" onClick={() => { setInput(EXAMPLE); setTokens(null) }}>Load Example</button>
      </div>

      <textarea
        className="mp-textarea"
        placeholder="Paste text with names, places, companies, dates..."
        value={input}
        onChange={e => { setInput(e.target.value); setTokens(null) }}
        rows={5}
      />

      <div className="mp-controls" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {Object.entries(TYPE_STYLES).map(([type, s]) => (
            <span key={type} style={{ fontSize: '12px', fontWeight: 600, background: s.bg, color: s.color, borderRadius: '6px', padding: '3px 10px' }}>
              {s.label}
            </span>
          ))}
        </div>
        <button className="mp-btn" onClick={handleAnalyze} disabled={!input.trim()}>Recognize Entities</button>
      </div>

      {tokens && (
        <div className="mp-result">
          {counts && (
            <div className="mp-stats" style={{ flexWrap: 'wrap' }}>
              {Object.entries(TYPE_STYLES).map(([type, s]) => (
                counts[type] > 0 && (
                  <span key={type} className="mp-stat">
                    <strong style={{ color: s.color }}>{counts[type]}</strong> {s.label}
                  </span>
                )
              ))}
            </div>
          )}
          <div className="mp-result-box mp-ner-output" style={{ lineHeight: '2.2', fontSize: '15px' }}>
            {tokens.map((tok, i) => {
              if (!tok.type) return <span key={i}>{tok.text}</span>
              const s = TYPE_STYLES[tok.type]
              return (
                <span key={i} style={{ background: s.bg, color: s.color, borderRadius: '4px', padding: '1px 6px', fontWeight: 600, fontSize: '14px' }}>
                  {tok.text.trim()}
                  <sup style={{ fontSize: '9px', marginLeft: '2px', opacity: 0.7 }}>{s.label}</sup>
                </span>
              )
            })}
          </div>
          <div className="mp-tech-tags">
            <span className="mp-tech">Rule-based NER</span>
            <span className="mp-tech">Tokenization</span>
            <span className="mp-tech">Pattern matching</span>
          </div>
        </div>
      )}
    </div>
  )
}
