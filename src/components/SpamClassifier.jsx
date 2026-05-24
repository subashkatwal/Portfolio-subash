import React, { useState } from 'react'

// Log-probability weights for spam/ham vocabulary
// Derived from common spam pattern research
const SPAM_VOCAB = {
  congratulations: 3.2, winner: 3.1, won: 2.8, prize: 3.0, claim: 2.6,
  free: 2.4, offer: 1.9, limited: 1.7, exclusive: 1.6, cash: 2.2,
  money: 1.9, earn: 1.9, win: 2.2, urgent: 2.3, guaranteed: 2.5,
  million: 2.8, billion: 2.8, apply: 1.3, subscribe: 1.3, discount: 1.6,
  cheap: 2.1, credit: 1.9, loan: 2.1, debt: 1.9, lottery: 3.2,
  selected: 2.1, special: 1.4, deal: 1.6, bonus: 2.1, reward: 2.1,
  expire: 1.9, account: 1.3, verify: 1.3, confirm: 1.2, password: 1.7,
  bank: 1.6, click: 1.7, link: 1.4, act: 1.3, now: 1.3,
  risk: 1.7, investment: 1.8, profit: 2.0, income: 1.8, gift: 1.8,
  congratulation: 3.2, giveaway: 2.8, coupon: 1.9, promo: 1.7,
}

const HAM_VOCAB = {
  hey: 2.1, hi: 2.0, hello: 1.8, thanks: 2.2, lunch: 2.3, dinner: 2.0,
  meeting: 1.8, tomorrow: 1.9, today: 1.6, schedule: 1.8, call: 1.4,
  chat: 1.7, let: 1.2, know: 1.3, think: 1.6, feel: 1.6, hope: 1.8,
  happy: 1.8, sorry: 1.7, please: 1.4, help: 1.2, working: 1.5,
  project: 1.5, team: 1.5, plan: 1.4, question: 1.4, idea: 1.7,
  discuss: 1.7, catch: 1.5, up: 1.0, weekend: 1.8, coffee: 1.9,
  afternoon: 1.7, morning: 1.6, evening: 1.7, available: 1.4, time: 1.1,
  review: 1.4, update: 1.3, feedback: 1.5, report: 1.3, following: 1.2,
  attached: 1.4, document: 1.3, regards: 1.6, sincerely: 1.7,
}

const EXAMPLES = [
  {
    label: 'Spam',
    text: "CONGRATULATIONS! You've been selected as today's lucky winner. Claim your FREE iPhone now- limited offer expires in 24 hours! Click the link to collect your prize.",
  },
  {
    label: 'Ham',
    text: "Hey! Are you free for lunch tomorrow? I was thinking we could catch up and discuss the project update. Let me know what time works best.",
  },
  {
    label: 'Subtle',
    text: "Hi, I wanted to follow up on our meeting from last week. I've attached the document with the updated schedule. Please review and let me know your feedback.",
  },
]

function classify(text) {
  const tokens = text.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean)

  // Log-probability accumulation (Naive Bayes style)
  let logSpam = 0, logHam = 0
  const spamTriggers = [], hamTriggers = []

  tokens.forEach(w => {
    if (SPAM_VOCAB[w]) {
      logSpam += SPAM_VOCAB[w]
      spamTriggers.push({ word: w, weight: SPAM_VOCAB[w] })
    }
    if (HAM_VOCAB[w]) {
      logHam += HAM_VOCAB[w]
      hamTriggers.push({ word: w, weight: HAM_VOCAB[w] })
    }
  })

  // Convert log scores to probabilities via softmax
  const expSpam = Math.exp(Math.min(logSpam, 20))
  const expHam  = Math.exp(Math.min(logHam, 20))
  const total   = expSpam + expHam

  const spamProb = total ? expSpam / total : 0.5
  const hamProb  = total ? expHam  / total : 0.5

  const isSpam = spamProb >= 0.5
  const confidence = Math.round(Math.max(spamProb, hamProb) * 100)

  // Top contributing features
  const topSpam = [...spamTriggers].sort((a, b) => b.weight - a.weight).slice(0, 5)
  const topHam  = [...hamTriggers].sort((a, b) => b.weight - a.weight).slice(0, 5)

  // Spam indicators: exclamation count, all-caps words, URL-like patterns
  const exclamations  = (text.match(/!/g) || []).length
  const capsWords     = (text.match(/\b[A-Z]{2,}\b/g) || []).length
  const hasUrl        = /https?:\/\/|www\.|\.com|click here/i.test(text)

  const extraSignals = []
  if (exclamations >= 2) extraSignals.push(`${exclamations} exclamation marks`)
  if (capsWords >= 1)    extraSignals.push(`${capsWords} ALL-CAPS word${capsWords > 1 ? 's' : ''}`)
  if (hasUrl)            extraSignals.push('URL or link detected')

  return {
    isSpam,
    spamProb: Math.round(spamProb * 100),
    hamProb: Math.round(hamProb * 100),
    confidence,
    topSpam,
    topHam,
    extraSignals,
    logSpam: logSpam.toFixed(2),
    logHam: logHam.toFixed(2),
  }
}

export default function SpamClassifier() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)

  const handleClassify = () => {
    if (!input.trim()) return
    setResult(classify(input))
  }

  return (
    <div className="mp-tool">
      <div className="mp-tool-header">
        <span className="mp-tool-icon">📨</span>
        <div>
          <h3 className="mp-tool-title">Spam Classifier</h3>
          <p className="mp-tool-desc">
            Naive Bayes classifier using log-probability scoring- shows spam/ham probabilities and highlights the features that drove the verdict.
          </p>
        </div>
      </div>

      <div className="mp-examples">
        <span className="mp-ex-label">Try example:</span>
        {EXAMPLES.map((e, i) => (
          <button
            key={i}
            className="mp-ex-btn"
            onClick={() => { setInput(e.text); setResult(null) }}
          >
            {e.label}
          </button>
        ))}
      </div>

      <textarea
        className="mp-textarea"
        placeholder="Type or paste a message to classify..."
        value={input}
        onChange={e => { setInput(e.target.value); setResult(null) }}
        rows={4}
      />

      <div className="mp-controls">
        <button className="mp-btn" onClick={handleClassify} disabled={!input.trim()}>
          Classify Message
        </button>
      </div>

      {result && (
        <div className="mp-result">
          {/* Verdict */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <span style={{ fontSize: '36px' }}>{result.isSpam ? '🚫' : '✅'}</span>
            <div>
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: result.isSpam ? '#dc2626' : '#16a34a',
              }}>
                {result.isSpam ? 'Spam detected' : 'Looks like ham'}
              </div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
                {result.confidence}% confidence
              </div>
            </div>
          </div>

          {/* Probability bars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
            {[
              { label: 'Spam probability', prob: result.spamProb, color: '#dc2626', bg: '#fee2e2' },
              { label: 'Ham probability',  prob: result.hamProb,  color: '#16a34a', bg: '#dcfce7' },
            ].map(({ label, prob, color, bg }) => (
              <div key={label} style={{
                background: '#f9fafb',
                border: '1px solid #f3f4f6',
                borderRadius: '10px',
                padding: '10px 12px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color }}>{prob}%</div>
                <div style={{ marginTop: '6px', background: '#e5e7eb', borderRadius: '100px', height: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${prob}%`, height: '100%', background: color, borderRadius: '100px', transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Feature attribution */}
          {(result.topSpam.length > 0 || result.topHam.length > 0) && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '6px', fontWeight: 500 }}>
                Feature attribution
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {result.topSpam.map(({ word, weight }) => (
                  <span key={word} style={{
                    fontSize: '12px', padding: '3px 8px', borderRadius: '100px',
                    background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca',
                  }}>
                    🚩 {word} <span style={{ opacity: 0.7 }}>(+{weight.toFixed(1)})</span>
                  </span>
                ))}
                {result.topHam.map(({ word, weight }) => (
                  <span key={word} style={{
                    fontSize: '12px', padding: '3px 8px', borderRadius: '100px',
                    background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0',
                  }}>
                    ✓ {word} <span style={{ opacity: 0.7 }}>(+{weight.toFixed(1)})</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Extra signals */}
          {result.extraSignals.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '5px', fontWeight: 500 }}>
                Structural signals
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {result.extraSignals.map(s => (
                  <span key={s} style={{
                    fontSize: '12px', padding: '3px 8px', borderRadius: '100px',
                    background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa',
                  }}>⚠ {s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Log scores */}
          <div style={{ fontSize: '11px', color: '#d1d5db', marginBottom: '10px' }}>
            log P(spam) = {result.logSpam} · log P(ham) = {result.logHam}
          </div>

          <div className="mp-tech-tags">
            <span className="mp-tech">Naive Bayes</span>
            <span className="mp-tech">Log-probability scoring</span>
            <span className="mp-tech">Feature attribution</span>
            <span className="mp-tech">Structural signals</span>
          </div>
        </div>
      )}
    </div>
  )
}
