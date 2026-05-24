import React, { useState } from 'react'

const STOP_WORDS = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with','by',
  'is','are','was','were','be','been','being','have','has','had','do','does',
  'did','will','would','could','should','it','its','this','that','these','those',
  'i','you','he','she','we','they','their','our','your','his','her','not','no',
  'so','as','if','then','than','about','which','who','what','when','where','how',
  'all','any','both','each','some','into','through','during','before','after',
  'above','below','between','out','off','over','under','again','here','there',
  'can','just','also','such','more','most','other','only','than','very',
])

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w))
}

function buildTFIDF(texts) {
  const docs = texts.map(tokenize)
  const vocab = [...new Set(docs.flat())]

  const tf = docs.map(doc => {
    const freq = {}
    doc.forEach(w => { freq[w] = (freq[w] || 0) + 1 })
    const len = doc.length || 1
    Object.keys(freq).forEach(k => { freq[k] /= len })
    return freq
  })

  const idf = {}
  vocab.forEach(w => {
    const df = docs.filter(d => d.includes(w)).length
    idf[w] = Math.log((docs.length + 1) / (df + 1)) + 1
  })

  return { tf, idf, vocab, docs }
}

function cosineSimilarity(i, j, tf, idf, vocab) {
  let dot = 0, normA = 0, normB = 0
  vocab.forEach(w => {
    const a = (tf[i][w] || 0) * idf[w]
    const b = (tf[j][w] || 0) * idf[w]
    dot  += a * b
    normA += a * a
    normB += b * b
  })
  return normA && normB ? dot / (Math.sqrt(normA) * Math.sqrt(normB)) : 0
}

const EXAMPLES = [
  [
    `Machine learning uses algorithms to learn patterns from data and make predictions without explicit programming.`,
    `Deep learning is a branch of machine learning that uses neural networks to discover patterns in datasets automatically.`,
  ],
  [
    `Nepal is a landlocked country in South Asia famous for the Himalayan mountains and Mount Everest.`,
    `The Amazon rainforest in Brazil is the world's largest tropical forest, home to millions of species.`,
  ],
]

export default function TextSimilarityChecker() {
  const [textA, setTextA] = useState('')
  const [textB, setTextB] = useState('')
  const [result, setResult] = useState(null)

  const canCompare = textA.trim() && textB.trim()

  const handleCompare = () => {
    if (!canCompare) return
    const { tf, idf, vocab, docs } = buildTFIDF([textA, textB])
    const sim = cosineSimilarity(0, 1, tf, idf, vocab)
    const pct = Math.round(sim * 100)

    // shared terms (in both docs, sorted by combined TF weight)
    const sharedTerms = vocab
      .filter(w => docs[0].includes(w) && docs[1].includes(w))
      .map(w => ({ w, score: (tf[0][w] || 0) + (tf[1][w] || 0) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(x => x.w)

    // unique terms per doc
    const onlyA = [...new Set(docs[0])].filter(w => !docs[1].includes(w)).slice(0, 6)
    const onlyB = [...new Set(docs[1])].filter(w => !docs[0].includes(w)).slice(0, 6)

    let verdict, color
    if (pct > 70)      { verdict = 'High similarity- likely related content'; color = '#16a34a' }
    else if (pct > 40) { verdict = 'Moderate overlap- some shared themes';    color = '#d97706' }
    else if (pct > 15) { verdict = 'Low similarity- mostly different content'; color = '#ea580c' }
    else               { verdict = 'Very low similarity- unrelated texts';     color = '#dc2626' }

    setResult({ pct, sim, sharedTerms, onlyA, onlyB, verdict, color })
  }

  return (
    <div className="mp-tool">
      <div className="mp-tool-header">
        <span className="mp-tool-icon">🔁</span>
        <div>
          <h3 className="mp-tool-title">Text Similarity Checker</h3>
          <p className="mp-tool-desc">
            Computes cosine similarity between two texts using TF-IDF vectors- the same technique used in document retrieval and plagiarism detection.
          </p>
        </div>
      </div>

      <div className="mp-examples">
        <span className="mp-ex-label">Try example:</span>
        {EXAMPLES.map((pair, i) => (
          <button
            key={i}
            className="mp-ex-btn"
            onClick={() => { setTextA(pair[0]); setTextB(pair[1]); setResult(null) }}
          >
            Example {i + 1}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <textarea
          className="mp-textarea"
          placeholder="First text..."
          value={textA}
          onChange={e => { setTextA(e.target.value); setResult(null) }}
          rows={3}
        />
        <textarea
          className="mp-textarea"
          placeholder="Second text..."
          value={textB}
          onChange={e => { setTextB(e.target.value); setResult(null) }}
          rows={3}
        />
      </div>

      <div className="mp-controls">
        <button className="mp-btn" onClick={handleCompare} disabled={!canCompare}>
          Compare Texts
        </button>
      </div>

      {result && (
        <div className="mp-result">
          {/* Score + bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center', minWidth: '80px' }}>
              <div style={{ fontSize: '36px', fontWeight: 700, color: result.color }}>
                {result.pct}%
              </div>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>cosine similarity</div>
            </div>
            <div style={{ flex: 1, minWidth: '160px' }}>
              <div style={{ background: '#f3f4f6', borderRadius: '100px', height: '10px', overflow: 'hidden', marginBottom: '6px' }}>
                <div style={{
                  width: `${result.pct}%`,
                  height: '100%',
                  background: result.color,
                  borderRadius: '100px',
                  transition: 'width 0.5s ease',
                }} />
              </div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>{result.verdict}</div>
            </div>
          </div>

          {/* Shared terms */}
          {result.sharedTerms.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '6px', fontWeight: 500 }}>
                Shared key terms
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {result.sharedTerms.map(w => (
                  <span key={w} style={{
                    fontSize: '12px', padding: '3px 8px', borderRadius: '100px',
                    background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe',
                  }}>{w}</span>
                ))}
              </div>
            </div>
          )}

          {/* Unique terms */}
          {(result.onlyA.length > 0 || result.onlyB.length > 0) && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '5px', fontWeight: 500 }}>Only in Text 1</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {result.onlyA.map(w => (
                    <span key={w} style={{
                      fontSize: '11px', padding: '2px 7px', borderRadius: '100px',
                      background: '#f3f4f6', color: '#6b7280', border: '1px solid #e5e7eb',
                    }}>{w}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '5px', fontWeight: 500 }}>Only in Text 2</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {result.onlyB.map(w => (
                    <span key={w} style={{
                      fontSize: '11px', padding: '2px 7px', borderRadius: '100px',
                      background: '#f3f4f6', color: '#6b7280', border: '1px solid #e5e7eb',
                    }}>{w}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mp-tech-tags">
            <span className="mp-tech">TF-IDF vectors</span>
            <span className="mp-tech">Cosine similarity</span>
            <span className="mp-tech">Stop-word filtering</span>
          </div>
        </div>
      )}
    </div>
  )
}
