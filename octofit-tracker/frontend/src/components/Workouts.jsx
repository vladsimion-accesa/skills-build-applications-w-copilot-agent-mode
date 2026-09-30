import CollectionPage from './CollectionPage.jsx'

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
  return (
    <CollectionPage
      columns={columns}
      description="Sessions ready for your next training day."
      eyebrow="TRAINING LIBRARY"
      resource="workouts"
      title="Workouts"
    />
  )
}

export default Workouts