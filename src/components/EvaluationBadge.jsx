import React from 'react'

const config = {
  Pendiente:  { bg: 'rgba(255,163,64,.12)', color: '#ffa340', border: 'rgba(255,163,64,.3)' },
  Revisada:   { bg: 'rgba(79,207,128,.12)', color: '#4fcf80', border: 'rgba(79,207,128,.3)' },
  Corregida:  { bg: 'rgba(255,92,122,.12)',  color: '#ff5c7a', border: 'rgba(255,92,122,.3)' },
}

export default function EvaluationBadge({ status }) {
  const s = config[status] || config['Pendiente']
  return (
    <span style={{
      background: s.bg, color: s.color,
      border: `1px solid ${s.border}`,
      padding: '2px 10px', borderRadius: '20px',
      fontSize: '11px', fontWeight: 500
    }}>
      {status}
    </span>
  )
}
