import { useEffect, useState } from 'react'
import { extractRecords, formatDate, formatReference } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

const columns = [
  { label: 'Member', key: 'user', render: formatReference },
  { label: 'Activity', key: 'activityType' },
  { label: 'Duration', key: 'durationMinutes', render: (value) => `${value ?? 0} min` },
  { label: 'Distance', key: 'distanceKm', render: (value) => `${Number(value || 0).toFixed(1)} km` },
  { label: 'Points', key: 'points', render: (value) => `${value ?? 0} pts` },
  { label: 'Recorded', key: 'recordedAt', render: formatDate },
]

function Activities() {
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
          setError(requestError.message || 'Unable to load activities.')
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
      description="Training sessions logged by the club."
      eyebrow="MOVEMENT LOG"
      error={error}
      loading={loading}
      onRefresh={refresh}
      records={records}
      resource="activities"
      title="Activities"
    />
  )
}

export default Activities