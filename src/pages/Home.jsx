import React, { useState, useEffect } from 'react'
import Header from '../components/Header.jsx'
import EvidenceForm from '../components/EvidenceForm.jsx'
import EvidenceList from '../components/EvidenceList.jsx'
import EvaluationBadge from '../components/EvaluationBadge.jsx'
import Modal from '../components/Modal.jsx'
import Chat from '../components/Chat.jsx'

export default function Home() {
  const [tab, setTab] = useState('evidencias')
  const [evidences, setEvidences] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [modal, setModal] = useState({ open: false, id: null })
  const [chatUnread, setChatUnread] = useState(0)

  useEffect(() => { if (tab === 'chat') setChatUnread(0) }, [tab])

  const selected = evidences.find(e => e.id === selectedId) || null

  const handleSave = (form) => {
    if (editing) {
      setEvidences(prev => prev.map(e => e.id === editing.id ? { ...form, id: editing.id } : e))
      setEditing(null)
    } else {
      const newEv = { ...form, id: Date.now().toString() }
      setEvidences(prev => [newEv, ...prev])
      setSelectedId(newEv.id)
    }
    setShowForm(false)
  }

  const handleEdit = () => { setEditing(selected); setShowForm(true) }

  const handleDeleteConfirm = () => {
    setEvidences(prev => prev.filter(e => e.id !== modal.id))
    if (selectedId === modal.id) setSelectedId(null)
    setModal({ open: false, id: null })
  }

  const total     = evidences.length
  const pending   = evidences.filter(e => e.status === 'Pendiente').length
  const reviewed  = evidences.filter(e => e.status === 'Revisada').length
  const corrected = evidences.filter(e => e.status === 'Corregida').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Header
        tab={tab}
        onTab={setTab}
        onNew={() => { setEditing(null); setShowForm(true) }}
        chatUnread={chatUnread}
      />

      <main style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── TAB CHAT ── */}
        <div style={{ display: tab === 'chat' ? 'flex' : 'none', flex: 1, overflow: 'hidden' }}>
          <Chat onNewMessage={() => { if (tab !== 'chat') setChatUnread(n => n + 1) }} />
        </div>

        {/* ── TAB EVIDENCIAS ── */}
        {tab === 'evidencias' && (
          <>
            {/* Sidebar */}
            <aside style={{
              width: '320px', flexShrink: 0,
              background: 'var(--bg2)', borderRight: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden'
            }}>
              <div style={{ padding: '12px 16px 8px', borderBottom: '1px solid var(--border)', fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '.8px' }}>
                Evidencias ({total})
              </div>
              <EvidenceList evidences={evidences} selectedId={selectedId} onSelect={setSelectedId} />
            </aside>

            {/* Panel principal */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '24px' }}>
                {[
                  { num: total,     label: 'Total',      color: 'var(--accent)'  },
                  { num: pending,   label: 'Pendientes', color: 'var(--warn)'    },
                  { num: reviewed,  label: 'Revisadas',  color: 'var(--success)' },
                  { num: corrected, label: 'Corregidas', color: 'var(--danger)'  },
                ].map(s => (
                  <div key={s.label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 600, fontFamily: "'DM Mono', monospace", color: s.color }}>{s.num}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text2)', marginTop: '2px' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Formulario */}
              {showForm && (
                <EvidenceForm
                  initial={editing}
                  onSave={handleSave}
                  onCancel={() => { setShowForm(false); setEditing(null) }}
                />
              )}

              {/* Detalle */}
              {selected && !showForm && (
                <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 600 }}>{selected.name}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text2)', marginTop: '4px' }}>👤 {selected.student}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={handleEdit} style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text)' }}>✏️ Editar</button>
                      <button onClick={() => setModal({ open: true, id: selected.id })} style={{ background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)' }}>🗑 Eliminar</button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                    {[
                      { label: 'Tipo',             val: <span style={{ background: 'rgba(79,124,255,.15)', color: '#7aa4ff', border: '1px solid rgba(79,124,255,.3)', padding: '2px 10px', borderRadius: '20px', fontSize: '12px' }}>{selected.type}</span> },
                      { label: 'Estado',           val: <EvaluationBadge status={selected.status} /> },
                      { label: 'Fecha de entrega', val: selected.date || '—' },
                      { label: 'Calificación',     val: selected.grade !== '' ? <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '16px', color: 'var(--accent)' }}>{selected.grade}/10</span> : '—' },
                    ].map(item => (
                      <div key={item.label}>
                        <div style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: '4px' }}>{item.label}</div>
                        <div style={{ fontSize: '14px', color: 'var(--text)' }}>{item.val}</div>
                      </div>
                    ))}
                  </div>

                  {selected.description && (
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: '6px' }}>Descripción</div>
                      <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.6 }}>{selected.description}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Estado vacío */}
              {!selected && !showForm && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--text3)', gap: '12px' }}>
                  <div style={{ fontSize: '40px' }}>📋</div>
                  <div style={{ fontSize: '14px' }}>Selecciona una evidencia o crea una nueva</div>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <Modal
        open={modal.open}
        title="Eliminar evidencia"
        message="¿Estás seguro de que quieres eliminar esta evidencia? Esta acción no se puede deshacer."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setModal({ open: false, id: null })}
      />
    </div>
  )
}
