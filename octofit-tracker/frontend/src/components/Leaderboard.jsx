import { useEffect, useState } from 'react'
import { extractRecords, formatReference } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

const columns = [
  {
    label: 'Rank',
    key: '_id',
    render: (_value, _record, index) => <span className="rank-number">{String(index + 1).padStart(2, '0')}</span>,
  },
  { label: 'Member', key: 'user', render: formatReference },
  { label: 'Points', key: 'points', render: (value) => <strong>{value ?? 0}</strong> },
]

function Leaderboard() {
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
          setError(requestError.message || 'Unable to load leaderboard.')
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
      description="Club standings, ranked by points earned."
      eyebrow="SEASON STANDINGS"
      error={error}
      loading={loading}
      onRefresh={refresh}
      records={records}
      resource="leaderboard"
      title="Leaderboard"
    />
  )
}

export default Leaderboard