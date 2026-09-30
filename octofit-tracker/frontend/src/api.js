const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const API_BASE_URL = `${apiOrigin}/api`

function extractRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  const candidates = [
    payload?.results,
    payload?.items,
    payload?.records,
    payload?.data,
    payload?.data?.results,
    payload?.data?.items,
    payload?.data?.records,
  ]

  const records = candidates.find(Array.isArray)
  if (records) {
    return records
  }

  throw new Error('The API returned an unsupported collection response.')
}

export async function fetchCollection(resource, { signal } = {}) {
  const collection = resource.replace(/^\/+|\/+$/g, '')
  const response = await fetch(`${API_BASE_URL}/${collection}/`, { signal })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`)
  }

  return extractRecords(await response.json())
}

export function formatReference(value) {
  if (!value) {
    return '—'
  }

  if (typeof value === 'object') {
    return value.displayName || value.username || value.name || value._id || '—'
  }

  const reference = String(value)
  return reference.length > 16 ? `Member · ${reference.slice(-6)}` : reference
}

export function formatDate(value) {
  if (!value) {
    return '—'
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? '—'
    : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date)
}