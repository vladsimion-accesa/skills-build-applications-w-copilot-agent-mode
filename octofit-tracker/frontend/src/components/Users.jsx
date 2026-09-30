import { useEffect, useState } from 'react'
import { API_ORIGIN, extractRecords } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const endpoint = `${API_ORIGIN}/api/users/`

const columns = [
  { label: 'Member', key: 'displayName' },
  { label: 'Username', key: 'username', render: (value) => value ? `@${value}` : '—' },
  { label: 'Email', key: 'email' },
]

function Users() {
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
          setError(requestError.message || 'Unable to load members.')
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
      description="People taking part in the OctoFit community."
      eyebrow="CLUB DIRECTORY"
      error={error}
      loading={loading}
      onRefresh={refresh}
      records={records}
      resource="users"
      title="Members"
    />
  )
}

export default Users