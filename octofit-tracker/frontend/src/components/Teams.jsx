import { useEffect, useState } from 'react'
import { API_ORIGIN, extractRecords } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const endpoint = `${API_ORIGIN}/api/teams/`

const columns = [
  { label: 'Team', key: 'name' },
  { label: 'About', key: 'description' },
  {
    label: 'Members',
    key: 'members',
    render: (members) => `${Array.isArray(members) ? members.length : 0} members`,
  },
]

function Teams() {
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
          setError(requestError.message || 'Unable to load teams.')
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
      description="Training groups and their current membership."
      eyebrow="CLUB GROUPS"
      error={error}
      loading={loading}
      onRefresh={refresh}
      records={records}
      resource="teams"
      title="Teams"
    />
  )
}

export default Teams