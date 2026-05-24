import React, { useState } from 'react'

const POS_WORDS = {
  good: 1, great: 1.5, excellent: 2, amazing: 2, wonderful: 1.8, fantastic: 2,
  love: 1.8, best: 1.8, happy: 1.5, beautiful: 1.5, perfect: 2, awesome: 1.8,
  brilliant: 2, outstanding: 2, superb: 2, nice: 1, enjoy: 1.5, pleased: 1.5,
  glad: 1.3, positive: 1.2, win: 1.5, success: 1.5, delightful: 1.8, helpful: 1.3,
  kind: 1.2, friendly: 1.3, impressive: 1.8, joy: 1.8, hope: 1.2, thanks: 1,
  thank: 1, appreciate: 1.5, innovative: 1.5, creative: 1.3, powerful: 1.3,
  reliable: 1.2, clean: 1, fast: 1.2, smooth: 1.2, effective: 1.3, inspiring: 1.8,
}

const NEG_WORDS = {
  bad: 1, terrible: 2, awful: 2, horrible: 2, hate: 2, worst: 2, ugly: 1.5,
  fail: 1.5, failure: 1.8, problem: 1, broken: 1.8, issue: 1, disappoint: 1.8,
  sad: 1.2, angry: 1.5, frustrating: 1.8, poor: 1.2, useless: 1.8, annoying: 1.5,
  boring: 1.3, stupid: 1.8, trash: 2, wrong: 1, regret: 1.8, unfortunately: 1.3,
  waste: 1.5, worse: 1.5, painful: 1.8, ridiculous: 1.8, slow: 1, buggy: 1.5,
  confusing: 1.3, difficult: 1, terrible: 2, unreliable: 1.5, broken: 1.8,
}

const INTENSIFIERS = new Set([
  'very', 'extremely', 'incredibly', 'absolutely', 'totally', 'completely',
  'utterly', 'really', 'so', 'super', 'quite',
])

const NEGATORS = new Set(['not', "n't", 'never', 'no', 'neither', 'nor', 'hardly'])

const EXAMPLES = [
  `This product is absolutely amazing! I love how it works so smoothly and the design is beautiful. Highly recommend to everyone.`,
  `Terrible experience. The app kept crashing and customer support was completely useless. I regret buying this.`,
  `The documentation is okay. Some parts are helpful, others are a bit confusing. Overall it works as expected.`,
]

const COLORS = {
  positive: { bg: '#dcfce7', text: '#166534', border: '#bbf7d0', bar: '#16a34a' },
  negative: { bg: '#fee2e2', text: '#991b1b', border: '#fecaca', bar: '#dc2626' },
  neutral:  { bg: '#fef9c3', text: '#854d0e', border: '#fef08a', bar: '#d97706' },
}

function analyze(text) {
  const tokens = text.toLowerCase().replace(/[^a-z'\s]/g, ' ').split(/\s+/).filter(Boolean)
  let score = 0
  const posFound = [], negFound = []
  let mult = 1, negate = false

  tokens.forEach((w) => {
    const clean = w.replace(/'/g, '')
    if (INTENSIFIERS.has(clean)) { mult = 1.6; return }
    if (NEGATORS.has(clean)) { negate = true; return }

    if (POS_WORDS[clean] !== undefined) {
      const s = POS_WORDS[clean] * mult
      if (negate) { score -= s; negFound.push(clean) } else { score += s; posFound.push(clean) }
    } else if (NEG_WORDS[clean] !== undefined) {
      const s = NEG_WORDS[clean] * mult
      if (negate) { score += s; posFound.push(clean) } else { score -= s; negFound.push(clean) }
    }
    mult = 1; negate = false
  })

  const total = posFound.length + negFound.length || 1
  const norm = Math.max(-1, Math.min(1, score / Math.sqrt(total * 2)))

  let sentiment, emoji
  if (norm > 0.15)      { sentiment = 'positive'; emoji = '😊' }
  else if (norm < -0.15) { sentiment = 'negative'; emoji = '😞' }
  else                   { sentiment = 'neutral';  emoji = '😐' }

  const confidence = Math.round(Math.abs(norm) * 100)
  const barPct = Math.round(((norm + 1) / 2) * 100)

  return { sentiment, emoji, confidence, barPct, posFound, negFound, norm }
}

export default function SentimentAnalyzer() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)

  const handleAnalyze = () => {
    if (!input.trim()) return
    setResult(analyze(input))
  }

  const c = result ? COLORS[result.sentiment] : null

  return (
    <div className="mp-tool">
      <div className="mp-tool-header">
        <span className="mp-tool-icon">💬</span>
        <div>
          <h3 className="mp-tool-title">Sentiment Analyzer</h3>
          <p className="mp-tool-desc">
            Lexicon-based sentiment scoring with intensifier and negation handling- detects positive, negative, or neutral polarity with confidence.
          </p>
        </div>
      </div>

      <div className="mp-examples">
        <span className="mp-ex-label">Try example:</span>
        {EXAMPLES.map((e, i) => (
          <button key={i} className="mp-ex-btn" onClick={() => { setInput(e); setResult(null) }}>
            Example {i + 1}
          </button>
        ))}
      </div>

      <textarea
        className="mp-textarea"
        placeholder="Type or paste any text- a review, tweet, product description..."
        value={input}
        onChange={e => { setInput(e.target.value); setResult(null) }}
        rows={4}
      />

      <div className="mp-controls">
        <button className="mp-btn" onClick={handleAnalyze} disabled={!input.trim()}>
          Analyze Sentiment
        </button>
      </div>

      {result && (
        <div className="mp-result">
          {/* Verdict */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <span style={{ fontSize: '40px' }}>{result.emoji}</span>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: c.bar, textTransform: 'capitalize' }}>
                {result.sentiment}
              </div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
                Confidence: {result.confidence}% ·{' '}
                {result.posFound.length} positive signal{result.posFound.length !== 1 ? 's' : ''},{' '}
                {result.negFound.length} negative
              </div>
            </div>
          </div>

          {/* Polarity bar */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', marginBottom: '5px' }}>
              <span>Negative</span><span>Positive</span>
            </div>
            <div style={{ background: '#f3f4f6', borderRadius: '100px', height: '10px', overflow: 'hidden' }}>
              <div style={{
                width: `${result.barPct}%`,
                height: '100%',
                background: c.bar,
                borderRadius: '100px',
                transition: 'width 0.5s ease, background 0.5s ease',
              }} />
            </div>
          </div>

          {/* Word tags */}
          {(result.posFound.length > 0 || result.negFound.length > 0) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              {result.posFound.map(w => (
                <span key={w} style={{
                  fontSize: '12px', padding: '3px 8px', borderRadius: '100px',
                  background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0',
                }}>+ {w}</span>
              ))}
              {result.negFound.map(w => (
                <span key={w} style={{
                  fontSize: '12px', padding: '3px 8px', borderRadius: '100px',
                  background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca',
                }}>− {w}</span>
              ))}
            </div>
          )}

          <div className="mp-tech-tags">
            <span className="mp-tech">Lexicon scoring</span>
            <span className="mp-tech">Intensifier detection</span>
            <span className="mp-tech">Negation handling</span>
          </div>
        </div>
      )}
    </div>
  )
}
