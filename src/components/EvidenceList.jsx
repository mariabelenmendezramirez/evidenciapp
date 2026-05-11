import React, { useState } from 'react'
import EvidenceCard from './EvidenceCard.jsx'

export default function EvidenceList({ evidences, selectedId, onSelect }) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const filtered = evidences.filter(e => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.student.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus ? e.status === filterStatus : true
    return matchSearch && matchStatus
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Filtros */}
      <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o estudiante..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">Todos los estados</option>
          <option>Pendiente</option>
          <option>Revisada</option>
          <option>Corregida</option>
        </select>
      </div>

      {/* Lista */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text3)', fontSize: '13px' }}>
            {evidences.length === 0 ? 'Aún no hay evidencias registradas.' : 'Sin resultados.'}
          </div>
        ) : (
          filtered.map(e => (
            <EvidenceCard
              key={e.id}
              evidence={e}
              selected={selectedId === e.id}
              onClick={() => onSelect(e.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}
