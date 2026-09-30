import { useEffect, useState } from 'react'
import { extractRecords } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const columns = [
  { label: 'Workout', key: 'name' },
  { label: 'Category', key: 'category' },
  {
    label: 'Difficulty',
    key: 'difficulty',
    render: (value) => value ? <span className="difficulty-tag">{value}</span> : '—',
  },
  { label: 'Duration', key: 'durationMinutes', render: (value) => `${value ?? 0} min` },
  { label: 'Details', key: 'description' },
]

function Workouts() {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetch(endpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`)
        }
        return response.json()
      })
      .then((payload) => setRecords(extractRecords(payload)))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load workouts.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [reloadKey])

  function refresh() {
    setLoading(true)
    setError('')
    setReloadKey((value) => value + 1)
  }

  return (
    <CollectionPage
      columns={columns}
      description="Sessions ready for your next training day."
      eyebrow="TRAINING LIBRARY"
      error={error}
      loading={loading}
      onRefresh={refresh}
      records={records}
      resource="workouts"
      title="Workouts"
    />
  )
}

export default Workouts