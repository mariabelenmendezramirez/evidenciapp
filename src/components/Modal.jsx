import React from 'react'

export default function Modal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)',
      zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border2)',
        borderRadius: '14px', padding: '24px',
        width: 'min(440px, 95vw)', position: 'relative',
        animation: 'fadeIn .2s ease'
      }}>
        <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>

        <button
          onClick={onCancel}
          style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', color: 'var(--text3)', fontSize: '18px' }}
        >
          ✕
        </button>

        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{title}</h3>
        <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '20px' }}>{message}</p>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{ background: 'transparent', border: '1px solid var(--border2)', color: 'var(--text2)' }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            style={{ background: 'var(--danger)', color: '#fff' }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
