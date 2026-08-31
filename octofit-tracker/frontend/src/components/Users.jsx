import { useEffect, useState } from 'react'
import { fetchUrl } from '../api'
import ResourceTable from './ResourceTable'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'username', label: 'Username' },
]

export default function Users() {
  const [payload, setPayload] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUrl(usersEndpoint).then(setPayload).catch((loadError) => setError(loadError.message))
  }, [])

  return <ResourceView title="Members" eyebrow="People" payload={payload} error={error} columns={columns} emptyMessage="No members have joined yet." />
}

function ResourceView({ title, eyebrow, payload, error, columns, emptyMessage }) {
  return <section className="resource-view"><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><span className="section-tag">Live API</span></div>{error ? <div className="alert alert-warning">{error}</div> : <ResourceTable payload={payload} columns={columns} emptyMessage={emptyMessage} />}</section>
}
