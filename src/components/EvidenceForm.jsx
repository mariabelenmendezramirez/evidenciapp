import React, { useState, useEffect } from 'react'

const EMPTY = {
  student: '', name: '', type: 'Reporte',
  description: '', date: '', grade: '', status: 'Pendiente'
}

export default function EvidenceForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY)

  useEffect(() => {
    setForm(initial || EMPTY)
  }, [initial])

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = () => {
    if (!form.student.trim() || !form.name.trim()) {
      alert('Completa el nombre del estudiante y la evidencia.')
      return
    }
    onSave(form)
    setForm(EMPTY)
  }

  const label = (text) => (
    <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '.5px' }}>
      {text}
    </label>
  )

  const group = (children, full = false) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', gridColumn: full ? '1 / -1' : undefined }}>
      {children}
    </div>
  )

  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '20px', marginBottom: '20px'
    }}>
      <h3 style={{
        fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: 'var(--text)',
        display: 'flex', alignItems: 'center', gap: '8px'
      }}>
        <span style={{ display: 'inline-block', width: '3px', height: '16px', background: 'var(--accent)', borderRadius: '2px' }} />
        {initial ? 'Editar evidencia' : 'Nueva evidencia'}
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

        {/* Nombre del estudiante */}
        {group(<>
          {label('Nombre del estudiante')}
          <input
            type="text"
            placeholder="Ej: María López"
            value={form.student}
            onChange={e => set('student', e.target.value)}
          />
        </>)}

        {/* Nombre de la evidencia */}
        {group(<>
          {label('Nombre de la evidencia')}
          <input
            type="text"
            placeholder="Ej: Reporte final"
            value={form.name}
            onChange={e => set('name', e.target.value)}
          />
        </>)}

        {/* Tipo de evidencia */}
        {group(<>
          {label('Tipo de evidencia')}
          <select value={form.type} onChange={e => set('type', e.target.value)}>
            <option>Reporte</option>
            <option>Código</option>
            <option>Presentación</option>
            <option>Video</option>
            <option>Práctica</option>
          </select>
        </>)}

        {/* Fecha de entrega */}
        {group(<>
          {label('Fecha de entrega')}
          <input
            type="date"
            value={form.date}
            onChange={e => set('date', e.target.value)}
          />
        </>)}

        {/* Calificación estimada */}
        {group(<>
          {label('Calificación estimada')}
          <input
            type="number"
            min="0" max="10" step="0.1"
            placeholder="0 – 10"
            value={form.grade}
            onChange={e => set('grade', e.target.value)}
          />
        </>)}

        {/* Estado */}
        {group(<>
          {label('Estado')}
          <select value={form.status} onChange={e => set('status', e.target.value)}>
            <option>Pendiente</option>
            <option>Revisada</option>
            <option>Corregida</option>
          </select>
        </>)}

        {/* Descripción (full width) */}
        {group(<>
          {label('Descripción')}
          <textarea
            placeholder="Explicación breve de la evidencia..."
            value={form.description}
            onChange={e => set('description', e.target.value)}
          />
        </>, true)}

      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '14px' }}>
        <button
          onClick={onCancel}
          style={{ background: 'transparent', border: '1px solid var(--border2)', color: 'var(--text2)' }}
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          {initial ? 'Guardar cambios' : 'Registrar evidencia'}
        </button>
      </div>
    </div>
  )
}
