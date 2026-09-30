import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return `${value.length} items`
  }

  if (typeof value === 'object') {
    return value.displayName || value.username || value.name || value._id || 'Details'
  }

  return String(value)
}

function CollectionPage({ title, eyebrow, description, resource, columns }) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const isBusy = loading || refreshing

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(resource, { signal: controller.signal })
      .then((collection) => {
        setRecords(collection)
        setError('')
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load this collection.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
          setRefreshing(false)
        }
      })

    return () => controller.abort()
  }, [resource, reloadKey])

  function refresh() {
    setRefreshing(true)
    setError('')
    setReloadKey((value) => value + 1)
  }

  return (
    <section aria-busy={isBusy}>
      <div className="page-heading">
        <div>
          <div className="page-eyebrow">{eyebrow}</div>
          <h1 className="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <div className="record-summary">
          <span className="record-summary-value">{isBusy ? '—' : records.length}</span>
          <span className="record-summary-label">RECORDS</span>
        </div>
      </div>

      <div className="collection-panel">
        <div className="collection-toolbar">
          <span className="collection-label">CURRENT ROSTER</span>
          <button
            className="btn btn-sm refresh-button"
            disabled={isBusy}
            onClick={refresh}
            type="button"
          >
            <span aria-hidden="true">↻</span> Refresh
          </button>
        </div>

        {error ? (
          <div className="collection-message collection-error" role="alert">
            <div>
              <strong>Could not load {title.toLowerCase()}.</strong>
              <p>{error}</p>
            </div>
            <button className="btn btn-sm btn-outline-danger" onClick={refresh} type="button">
              Try again
            </button>
          </div>
        ) : isBusy ? (
          <div className="collection-message" role="status">
            <span className="spinner-border spinner-border-sm" aria-hidden="true" />
            <span>Loading records…</span>
          </div>
        ) : records.length === 0 ? (
          <div className="collection-message">No records yet.</div>
        ) : (
          <div className="table-responsive">
            <table className="table collection-table mb-0">
              <thead>
                <tr>
                  {columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record._id || `${resource}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.label}>
                        {column.render
                          ? column.render(record[column.key], record, index)
                          : displayValue(record[column.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default CollectionPage