import { useState, useEffect, useRef, useCallback } from 'react'

export default function useChat() {
  const [status, setStatus] = useState('disconnected') // disconnected | connecting | connected
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [myId, setMyId] = useState(null)
  const [myColor, setMyColor] = useState(null)
  const wsRef = useRef(null)

  const connect = useCallback((host, port, username) => {
    if (wsRef.current) wsRef.current.close()
    setStatus('connecting')
    setMessages([])
    setUsers([])

    const ws = new WebSocket(`ws://${host}:${port}`)
    wsRef.current = ws

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'join', username }))
    }

    ws.onmessage = (e) => {
      let data
      try { data = JSON.parse(e.data) } catch { return }

      if (data.type === 'init') {
        setMyId(data.clientId)
        setMyColor(data.color)
        setMessages(data.history || [])
        setUsers(data.users || [])
        setStatus('connected')
      }
      if (data.type === 'message' || data.type === 'system') {
        setMessages(prev => [...prev, data])
      }
      if (data.type === 'users') {
        setUsers(data.users)
      }
    }

    ws.onerror = () => {
      setStatus('disconnected')
    }

    ws.onclose = () => {
      setStatus('disconnected')
    }
  }, [])

  const sendMessage = useCallback((text) => {
    if (wsRef.current && wsRef.current.readyState === 1) {
      wsRef.current.send(JSON.stringify({ type: 'message', text }))
    }
  }, [])

  const disconnect = useCallback(() => {
    if (wsRef.current) wsRef.current.close()
    setStatus('disconnected')
    setMessages([])
    setUsers([])
  }, [])

  useEffect(() => () => { if (wsRef.current) wsRef.current.close() }, [])

  return { status, messages, users, myId, myColor, connect, sendMessage, disconnect }
}
