import React, { useState } from 'react'

const STOP_WORDS = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','are',
  'was','were','be','been','being','have','has','had','do','does','did','will','would','could',
  'should','may','might','it','its','this','that','these','those','i','you','he','she','we',
  'they','their','our','your','his','her','not','no','so','as','if','then','than','about',
  'also','which','who','what','when','where','how','all','any','both','each','few','more',
  'most','other','some','such','into','through','during','before','after','above','below',
  'between','out','off','over','under','again','further','once','here','there','can','just',
])

function extractKeywords(text, topN = 15) {
  const clean = text.toLowerCase().replace(/[^a-z\s]/g, ' ')
  const words = clean.split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w))

  // Unigram freq
  const freq = {}
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1 })

  // Bigrams
  const bigrams = {}
  for (let i = 0; i < words.length - 1; i++) {
    const bg = `${words[i]} ${words[i+1]}`
    bigrams[bg] = (bigrams[bg] || 0) + 1
  }

  const totalWords = words.length || 1

  // Score unigrams
  const uniScored = Object.entries(freq)
    .map(([word, count]) => ({
      keyword: word,
      count,
      score: (count / totalWords) * Math.log(1 + word.length),
      type: 'word',
    }))
    .filter(x => x.count >= 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)

  // Score bigrams (only if appear 2+ times or text is long)
  const biScored = Object.entries(bigrams)
    .filter(([, c]) => c >= 2)
    .map(([bg, count]) => ({
      keyword: bg,
      count,
      score: (count / totalWords) * 2.5,
      type: 'phrase',
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  // Merge, deduplicate, normalize scores
  const all = [...biScored, ...uniScored]
  const seen = new Set()
  const unique = all.filter(x => {
    if (seen.has(x.keyword)) return false
    seen.add(x.keyword)
    return true
  }).slice(0, topN)

  const maxScore = unique[0]?.score || 1
  return unique.map(x => ({ ...x, rel: x.score / maxScore }))
}

const EXAMPLES = [
  `Machine learning is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed. Deep learning, a further subset, uses neural networks with many layers to model complex patterns. Natural language processing allows machines to understand human text and speech. These technologies power applications like recommendation systems, fraud detection, autonomous vehicles, and large language models like GPT and Claude.`,
  `Nepal is a beautiful country with stunning Himalayan mountains including Mount Everest. Tourism is a major economic sector, attracting trekkers and climbers from around the world. Kathmandu valley contains ancient temples and UNESCO heritage sites. The country's biodiversity spans from tropical forests to alpine glaciers. Nepal's culture is influenced by both Hindu and Buddhist traditions, creating a unique spiritual landscape.`,
]

const COLORS = [
  '#2563eb','#7c3aed','#0891b2','#059669','#d97706','#dc2626',
  '#9333ea','#0284c7','#16a34a','#ca8a04','#ea580c','#be185d',
]

export default function KeywordExtractor() {
  const [input, setInput] = useState('')
  const [keywords, setKeywords] = useState(null)
  const [view, setView] = useState('cloud') // 'cloud' | 'bars'

  const handleExtract = () => {
    if (!input.trim()) return
    setKeywords(extractKeywords(input, 18))
  }

  return (
    <div className="mp-tool">
      <div className="mp-tool-header">
        <span className="mp-tool-icon">🏷️</span>
        <div>
          <h3 className="mp-tool-title">Keyword Extractor</h3>
          <p className="mp-tool-desc">TF-based extraction with bigram detection- surfaces the most important words and phrases.</p>
        </div>
      </div>

      <div className="mp-examples">
        <span className="mp-ex-label">Try example:</span>
        {EXAMPLES.map((e, i) => (
          <button key={i} className="mp-ex-btn" onClick={() => { setInput(e); setKeywords(null) }}>
            Example {i + 1}
          </button>
        ))}
      </div>

      <textarea
        className="mp-textarea"
        placeholder="Paste any text- article, paragraph, research abstract..."
        value={input}
        onChange={e => { setInput(e.target.value); setKeywords(null) }}
        rows={5}
      />

      <div className="mp-controls">
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`mp-view-btn${view === 'cloud' ? ' active' : ''}`}
            onClick={() => setView('cloud')}>☁ Cloud</button>
          <button
            className={`mp-view-btn${view === 'bars' ? ' active' : ''}`}
            onClick={() => setView('bars')}>▦ Bars</button>
        </div>
        <button className="mp-btn" onClick={handleExtract} disabled={!input.trim()}>Extract Keywords</button>
      </div>

      {keywords && (
        <div className="mp-result">
          <div className="mp-stats">
            <span className="mp-stat"><strong>{keywords.length}</strong> keywords found</span>
            <span className="mp-stat"><strong>{keywords.filter(k => k.type === 'phrase').length}</strong> phrases</span>
            <span className="mp-stat"><strong>{input.trim().split(/\s+/).length}</strong> words analyzed</span>
          </div>

          {view === 'cloud' ? (
            <div className="mp-word-cloud">
              {keywords.map((kw, i) => (
                <span key={kw.keyword} className="mp-cloud-word" style={{
                  fontSize: `${12 + kw.rel * 16}px`,
                  fontWeight: kw.rel > 0.6 ? 700 : kw.rel > 0.3 ? 600 : 500,
                  color: COLORS[i % COLORS.length],
                  opacity: 0.5 + kw.rel * 0.5,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: COLORS[i % COLORS.length] + '12',
                }}>
                  {kw.keyword}
                </span>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {keywords.slice(0, 12).map((kw, i) => (
                <div key={kw.keyword}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: COLORS[i % COLORS.length] }}>
                      {kw.type === 'phrase' ? '🔗 ' : ''}{kw.keyword}
                    </span>
                    <span style={{ color: '#9ca3af' }}>×{kw.count}</span>
                  </div>
                  <div style={{ background: '#f3f4f6', borderRadius: '100px', height: '8px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${kw.rel * 100}%`, height: '100%',
                      background: COLORS[i % COLORS.length],
                      borderRadius: '100px', transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mp-tech-tags" style={{ marginTop: '16px' }}>
            <span className="mp-tech">TF Scoring</span>
            <span className="mp-tech">Bigram detection</span>
            <span className="mp-tech">Stop-word filtering</span>
          </div>
        </div>
      )}
    </div>
  )
}
