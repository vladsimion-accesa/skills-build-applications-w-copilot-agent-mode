import { formatReference } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

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
  return (
    <CollectionPage
      columns={columns}
      description="Club standings, ranked by points earned."
      eyebrow="SEASON STANDINGS"
      resource="leaderboard"
      title="Leaderboard"
    />
  )
}

export default Leaderboard