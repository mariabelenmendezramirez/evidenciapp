import React from 'react'

export default function Header({ tab, onTab, onNew, chatUnread }) {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center',
      background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
      padding: '0 20px', height: '52px', gap: '0', flexShrink: 0
    }}>
      <div style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.3px', marginRight: '24px', whiteSpace: 'nowrap' }}>
        Evidenci<span style={{ color: 'var(--accent)' }}>App</span>
      </div>

      <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
        {[
          { id: 'evidencias', label: '📋 Evidencias' },
          { id: 'chat',       label: '💬 Chat', badge: chatUnread },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => onTab(t.id)}
            style={{
              padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 500,
              background: tab === t.id ? 'var(--accent)' : 'none',
              color: tab === t.id ? '#fff' : 'var(--text2)',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all .15s'
            }}
          >
            {t.label}
            {t.badge > 0 && (
              <span style={{ background: 'var(--danger)', color: '#fff', padding: '1px 6px', borderRadius: '10px', fontSize: '11px' }}>
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 'evidencias' && (
        <button
          onClick={onNew}
          style={{ background: 'var(--accent)', color: '#fff', padding: '7px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, flexShrink: 0 }}
        >
          + Nueva evidencia
        </button>
      )}
    </nav>
  )
}
