import React, { useState, useRef, useEffect } from 'react'
import useChat from '../hooks/useChat.js'

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
}

export default function Chat() {
  const { status, messages, users, myId, myColor, connect, sendMessage, disconnect } = useChat()

  const [host, setHost] = useState('192.168.1.1')
  const [port, setPort] = useState('3001')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  // Auto-scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleConnect = () => {
    if (!username.trim()) { setError('Escribe tu nombre.'); return }
    setError('')
    connect(host, port, username.trim())
    // Si tras 3s sigue en connecting, mostrar error
    setTimeout(() => {
      setError(prev => prev === '' ? 'No se pudo conectar. Verifica la IP y el puerto.' : prev)
    }, 3000)
  }

  const handleSend = () => {
    if (!text.trim()) return
    sendMessage(text.trim())
    setText('')
  }

  // ── PANTALLA DE LOGIN ────────────────────────────────────────────
  if (status !== 'connected') {
    return (
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)'
      }}>
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border2)',
          borderRadius: '16px', padding: '32px', width: 'min(400px, 95vw)',
          boxShadow: '0 24px 64px rgba(0,0,0,.5)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px', textAlign: 'center' }}>
            Unirse al Chat
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '24px', textAlign: 'center' }}>
            Ingresa el servidor y tu nombre para conectarte.
          </p>

          {/* IP + Puerto */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
            <input
              placeholder="IP del servidor"
              value={host}
              onChange={e => setHost(e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              placeholder="Puerto"
              value={port}
              onChange={e => setPort(e.target.value)}
              style={{ width: '90px' }}
            />
          </div>

          {/* Nombre */}
          <input
            placeholder="Tu nombre"
            value={username}
            maxLength={24}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleConnect()}
            style={{ marginBottom: '12px' }}
          />

          {/* Error */}
          {error && (
            <p style={{ fontSize: '13px', color: 'var(--danger)', marginBottom: '12px', textAlign: 'center' }}>
              {error}
            </p>
          )}

          <button
            onClick={handleConnect}
            disabled={status === 'connecting'}
            style={{
              width: '100%', padding: '11px',
              background: status === 'connecting' ? 'var(--bg3)' : 'var(--accent)',
              color: '#fff', borderRadius: '8px', fontSize: '14px', fontWeight: 600
            }}
          >
            {status === 'connecting' ? 'Conectando...' : 'Conectar y Entrar'}
          </button>
        </div>
      </div>
    )
  }

  // ── PANTALLA DE CHAT ─────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

      {/* Sidebar usuarios */}
      <div style={{
        width: '190px', flexShrink: 0,
        background: 'var(--bg2)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden'
      }}>
        <div style={{
          padding: '14px 12px 10px', borderBottom: '1px solid var(--border)',
          fontSize: '12px', fontWeight: 600, color: 'var(--text2)',
          textTransform: 'uppercase', letterSpacing: '.7px'
        }}>
          En línea ({users.length})
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 8px' }}>
          {users.map(u => (
            <div key={u.id} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '6px 8px', borderRadius: '6px',
              background: u.id === myId ? 'rgba(79,124,255,.1)' : 'transparent'
            }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: u.color, flexShrink: 0
              }} />
              <span style={{
                fontSize: '13px', fontWeight: u.id === myId ? 600 : 400,
                color: u.id === myId ? 'var(--text)' : 'var(--text2)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
              }}>
                {u.username}{u.id === myId ? ' (tú)' : ''}
              </span>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 8px', borderTop: '1px solid var(--border)' }}>
          <button
            onClick={disconnect}
            style={{
              width: '100%', background: 'transparent',
              border: '1px solid var(--border2)', color: 'var(--text3)',
              borderRadius: '6px', padding: '6px', fontSize: '12px'
            }}
          >
            Salir
          </button>
        </div>
      </div>

      {/* Área de mensajes */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Mensajes */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {messages.map((msg, i) => {
            if (msg.type === 'system') {
              return (
                <div key={i} style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text3)', padding: '6px 0' }}>
                  {msg.text}
                </div>
              )
            }
            const isMe = msg.senderId === myId
            return (
              <div key={msg.id || i} style={{
                display: 'flex', flexDirection: 'column',
                alignItems: isMe ? 'flex-end' : 'flex-start',
                marginBottom: '2px'
              }}>
                {!isMe && (
                  <span style={{ fontSize: '11px', color: msg.color, marginBottom: '2px', marginLeft: '4px', fontWeight: 600 }}>
                    {msg.username}
                  </span>
                )}
                <div style={{
                  maxWidth: '70%', padding: '8px 13px',
                  borderRadius: isMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: isMe ? 'var(--accent)' : 'var(--bg3)',
                  border: `1px solid ${isMe ? 'transparent' : 'var(--border)'}`,
                  fontSize: '13px', color: 'var(--text)', lineHeight: 1.5,
                  wordBreak: 'break-word'
                }}>
                  {msg.text}
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text3)', marginTop: '2px', marginLeft: '4px', marginRight: '4px' }}>
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            )
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '12px 16px', borderTop: '1px solid var(--border)',
          background: 'var(--bg2)', display: 'flex', gap: '8px', alignItems: 'center'
        }}>
          <input
            placeholder="Escribe un mensaje..."
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            style={{ flex: 1 }}
          />
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            style={{
              background: text.trim() ? 'var(--accent)' : 'var(--bg3)',
              color: text.trim() ? '#fff' : 'var(--text3)',
              borderRadius: '8px', padding: '8px 16px', fontWeight: 600
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
