import React from 'react'
import EvaluationBadge from './EvaluationBadge.jsx'

export default function EvidenceCard({ evidence, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--card)',
        border: `1px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        padding: '14px', marginBottom: '10px',
        cursor: 'pointer', transition: 'all .15s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{evidence.name}</div>
        <EvaluationBadge status={evidence.status} />
      </div>
      <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '6px' }}>
        👤 {evidence.student}
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{
          background: 'rgba(79,124,255,.15)', color: '#7aa4ff',
          border: '1px solid rgba(79,124,255,.3)',
          padding: '2px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: 500
        }}>
          {evidence.type}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text3)' }}>
          📅 {evidence.date}
        </span>
        {evidence.grade !== '' && (
          <span style={{ fontSize: '11px', color: 'var(--accent)', fontFamily: "'DM Mono', monospace" }}>
            {evidence.grade}/10
          </span>
        )}
      </div>
    </div>
  )
}
