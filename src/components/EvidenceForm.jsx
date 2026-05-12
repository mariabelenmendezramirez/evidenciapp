import React, { useState, useEffect } from 'react'

const today = new Date().toISOString().split('T')[0]

const EMPTY = {
  student: '',
  name: '',
  type: 'Reporte',
  description: '',
  date: today,
  grade: '',
  status: 'Pendiente'
}

export default function EvidenceForm({ initial, onSave, onCancel }) {

  const [form, setForm] = useState(initial || EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(initial || EMPTY)
  }, [initial])

  const set = (field, value) => {
    setForm(f => ({
      ...f,
      [field]: value
    }))

    // Limpiar error al escribir
    setErrors(prev => ({
      ...prev,
      [field]: ''
    }))
  }

  const validate = () => {
    const newErrors = {}

    // Nombre del estudiante
    if (!form.student.trim()) {
      newErrors.student = 'El nombre del estudiante es obligatorio.'
    } else if (form.student.trim().length < 3) {
      newErrors.student = 'Debe tener al menos 3 caracteres.'
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(form.student)) {
      newErrors.student = 'Solo se permiten letras.'
    }

    // Nombre de evidencia
    if (!form.name.trim()) {
      newErrors.name = 'El nombre de la evidencia es obligatorio.'
    } else if (form.name.trim().length < 4) {
      newErrors.name = 'Debe tener al menos 4 caracteres.'
    }

    // Descripción
    if (form.description.trim().length < 10) {
      newErrors.description = 'La descripción debe tener mínimo 10 caracteres.'
    }

    // Calificación
    if (form.grade !== '') {
      const grade = parseFloat(form.grade)

      if (isNaN(grade)) {
        newErrors.grade = 'La calificación debe ser numérica.'
      } else if (grade < 0 || grade > 10) {
        newErrors.grade = 'La calificación debe estar entre 0 y 10.'
      }
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {

    if (!validate()) return

    onSave({
      ...form,
      date: today
    })

    setForm(EMPTY)
    setErrors({})
  }

  const label = (text) => (
    <label style={{
      fontSize: '12px',
      fontWeight: 500,
      color: 'var(--text2)',
      textTransform: 'uppercase',
      letterSpacing: '.5px'
    }}>
      {text}
    </label>
  )

  const group = (children, full = false) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      gridColumn: full ? '1 / -1' : undefined
    }}>
      {children}
    </div>
  )

  const errorText = (msg) => (
    msg && (
      <span style={{
        color: '#ff4d4f',
        fontSize: '12px'
      }}>
        {msg}
      </span>
    )
  )

  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      marginBottom: '20px'
    }}>

      <h3 style={{
        fontSize: '15px',
        fontWeight: 600,
        marginBottom: '16px',
        color: 'var(--text)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{
          display: 'inline-block',
          width: '3px',
          height: '16px',
          background: 'var(--accent)',
          borderRadius: '2px'
        }} />
        {initial ? 'Editar evidencia' : 'Nueva evidencia'}
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
      }}>

        {/* Nombre del estudiante */}
        {group(<>
          {label('Nombre del estudiante')}
          <input
            type="text"
            placeholder="Ej: María López"
            value={form.student}
            onChange={e => set('student', e.target.value)}
          />
          {errorText(errors.student)}
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
          {errorText(errors.name)}
        </>)}

        {/* Tipo */}
        {group(<>
          {label('Tipo de evidencia')}
          <select
            value={form.type}
            onChange={e => set('type', e.target.value)}
          >
            <option>Reporte</option>
            <option>Código</option>
            <option>Presentación</option>
            <option>Video</option>
            <option>Práctica</option>
          </select>
        </>)}

        {/* Fecha automática */}
        {group(<>
          {label('Fecha de registro')}
          <input
            type="date"
            value={form.date}
            disabled
            style={{
              opacity: 0.7,
              cursor: 'not-allowed'
            }}
          />
        </>)}

        {/* Calificación */}
        {group(<>
          {label('Calificación estimada')}
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="0 – 10"
            value={form.grade}
            onChange={e => set('grade', e.target.value)}
          />
          {errorText(errors.grade)}
        </>)}

        {/* Estado */}
        {group(<>
          {label('Estado')}
          <select
            value={form.status}
            onChange={e => set('status', e.target.value)}
          >
            <option>Pendiente</option>
            <option>Revisada</option>
            <option>Corregida</option>
          </select>
        </>)}

        {/* Descripción */}
        {group(<>
          {label('Descripción')}
          <textarea
            placeholder="Explicación breve de la evidencia..."
            value={form.description}
            onChange={e => set('description', e.target.value)}
          />
          {errorText(errors.description)}
        </>, true)}

      </div>

      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-end',
        marginTop: '14px'
      }}>

        <button
          onClick={onCancel}
          style={{
            background: 'transparent',
            border: '1px solid var(--border2)',
            color: 'var(--text2)'
          }}
        >
          Cancelar
        </button>

        <button
          onClick={handleSubmit}
          style={{
            background: 'var(--accent)',
            color: '#fff'
          }}
        >
          {initial ? 'Guardar cambios' : 'Registrar evidencia'}
        </button>

      </div>
    </div>
  )
}