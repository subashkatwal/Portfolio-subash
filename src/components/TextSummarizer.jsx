import React, { useState } from 'react'

// Extractive summarizer- pure JS, no backend needed
function summarize(text, ratio = 0.3) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []
  if (sentences.length <= 2) return text.trim()

  // Score each sentence by word frequency
  const words = text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/)
  const freq = {}
  const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','it','its','this','that','these','those','i','you','he','she','we','they','their','our','your','his','her'])
  words.forEach(w => { if (!stopWords.has(w) && w.length > 2) freq[w] = (freq[w] || 0) + 1 })

  const scores = sentences.map(s => {
    const ws = s.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/)
    return ws.reduce((sum, w) => sum + (freq[w] || 0), 0) / (ws.length || 1)
  })

  const count = Math.max(1, Math.round(sentences.length * ratio))
  const top = scores
    .map((score, i) => ({ score, i }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .sort((a, b) => a.i - b.i)
    .map(x => sentences[x.i].trim())

  return top.join(' ')
}

const EXAMPLES = [
  `Artificial intelligence (AI) is transforming nearly every industry. From healthcare to finance, machine learning models are being deployed to automate decisions, detect patterns, and generate insights at scale. In healthcare, AI assists in diagnosing diseases from medical images with accuracy rivaling human specialists. In finance, algorithms detect fraudulent transactions in milliseconds. Natural language processing allows computers to understand and generate human language, powering chatbots, translation tools, and document summarizers. Despite these advances, AI also raises ethical concerns around bias, privacy, and job displacement. Researchers and policymakers are working to create frameworks that ensure AI benefits are distributed fairly across society. The next decade will likely see even deeper AI integration into daily life, requiring thoughtful governance and continued investment in AI safety research.`,
  `Nepal is a landlocked country in South Asia, nestled between India and China. It is home to eight of the world's ten highest mountain peaks, including Mount Everest, the highest point on Earth at 8,849 metres. The country has a diverse geography ranging from the Terai plains in the south to the Himalayan ranges in the north. Kathmandu, the capital city, serves as the cultural and economic hub. Nepal's economy relies heavily on agriculture, tourism, and remittances from workers abroad. The country is known for its rich cultural heritage, with numerous UNESCO World Heritage Sites including temples, palaces, and ancient cities. Nepal has made significant progress in recent decades in areas like literacy and poverty reduction, though challenges remain in infrastructure and economic development.`,
]

export default function TextSummarizer() {
  const [input, setInput] = useState('')
  const [summary, setSummary] = useState('')
  const [ratio, setRatio] = useState(0.3)
  const [stats, setStats] = useState(null)

  const handleSummarize = () => {
    if (!input.trim()) return
    const result = summarize(input, ratio)
    setSummary(result)
    const inWords = input.trim().split(/\s+/).length
    const outWords = result.trim().split(/\s+/).length
    setStats({ inWords, outWords, reduction: Math.round((1 - outWords / inWords) * 100) })
  }

  return (
    <div className="mp-tool">
      <div className="mp-tool-header">
        <span className="mp-tool-icon">📝</span>
        <div>
          <h3 className="mp-tool-title">Text Summarizer</h3>
          <p className="mp-tool-desc">Extractive NLP- scores sentences by word frequency and picks the most important ones.</p>
        </div>
      </div>

      <div className="mp-examples">
        <span className="mp-ex-label">Try example:</span>
        {EXAMPLES.map((e, i) => (
          <button key={i} className="mp-ex-btn" onClick={() => { setInput(e); setSummary(''); setStats(null) }}>
            Example {i + 1}
          </button>
        ))}
      </div>

      <textarea
        className="mp-textarea"
        placeholder="Paste any long text here (news article, essay, paragraph)..."
        value={input}
        onChange={e => { setInput(e.target.value); setSummary(''); setStats(null) }}
        rows={6}
      />

      <div className="mp-controls">
        <div className="mp-slider-wrap">
          <label className="mp-label">Summary length: <strong>{Math.round(ratio * 100)}%</strong> of original</label>
          <input type="range" min="0.1" max="0.6" step="0.05" value={ratio}
            onChange={e => setRatio(parseFloat(e.target.value))} className="mp-slider" />
        </div>
        <button className="mp-btn" onClick={handleSummarize} disabled={!input.trim()}>Summarize</button>
      </div>

      {summary && (
        <div className="mp-result">
          {stats && (
            <div className="mp-stats">
              <span className="mp-stat"><strong>{stats.inWords}</strong> words in</span>
              <span className="mp-stat-arrow">→</span>
              <span className="mp-stat"><strong>{stats.outWords}</strong> words out</span>
              <span className="mp-stat-badge">{stats.reduction}% shorter</span>
            </div>
          )}
          <div className="mp-result-box">{summary}</div>
          <div className="mp-tech-tags">
            <span className="mp-tech">Extractive NLP</span>
            <span className="mp-tech">TF Scoring</span>
            <span className="mp-tech">Stop-word filtering</span>
          </div>
        </div>
      )}
    </div>
  )
}
