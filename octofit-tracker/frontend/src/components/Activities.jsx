import { formatDate, formatReference } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Member', key: 'user', render: formatReference },
  { label: 'Activity', key: 'activityType' },
  { label: 'Duration', key: 'durationMinutes', render: (value) => `${value ?? 0} min` },
  { label: 'Distance', key: 'distanceKm', render: (value) => `${Number(value || 0).toFixed(1)} km` },
  { label: 'Points', key: 'points', render: (value) => `${value ?? 0} pts` },
  { label: 'Recorded', key: 'recordedAt', render: formatDate },
]

function Activities() {
  return (
    <CollectionPage
      columns={columns}
      description="Training sessions logged by the club."
      eyebrow="MOVEMENT LOG"
      resource="activities"
      title="Activities"
    />
  )
}

export default Activities