import CollectionPage from './CollectionPage.jsx'

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
  return (
    <CollectionPage
      columns={columns}
      description="Training groups and their current membership."
      eyebrow="CLUB GROUPS"
      resource="teams"
      title="Teams"
    />
  )
}

export default Teams