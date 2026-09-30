import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Member', key: 'displayName' },
  { label: 'Username', key: 'username', render: (value) => value ? `@${value}` : '—' },
  { label: 'Email', key: 'email' },
]

function Users() {
  return (
    <CollectionPage
      columns={columns}
      description="People taking part in the OctoFit community."
      eyebrow="CLUB DIRECTORY"
      resource="users"
      title="Members"
    />
  )
}

export default Users