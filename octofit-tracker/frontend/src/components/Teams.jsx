import { useEffect, useState } from 'react'
import { fetchResource } from '../api'
import ResourceTable from './ResourceTable'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'members', label: 'Members' },
  { key: 'points', label: 'Points' },
]

export default function Teams() {
  const [payload, setPayload] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchResource('teams').then(setPayload).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourceView title="Teams" eyebrow="Community" payload={payload} error={error} columns={columns} emptyMessage="Create a team to start competing together." />
}

function ResourceView({ title, eyebrow, payload, error, columns, emptyMessage }) {
  return <section className="resource-view"><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><span className="section-tag">Live API</span></div>{error ? <div className="alert alert-warning">{error}</div> : <ResourceTable payload={payload} columns={columns} emptyMessage={emptyMessage} />}</section>
}
