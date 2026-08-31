import { useEffect, useState } from 'react'
import { fetchResource } from '../api'
import ResourceTable from './ResourceTable'

const columns = [
  { key: 'type', label: 'Activity' },
  { key: 'duration', label: 'Duration' },
  { key: 'points', label: 'Points' },
]

export default function Activities() {
  const [payload, setPayload] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchResource('activities').then(setPayload).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourceView title="Activity log" eyebrow="Movement" payload={payload} error={error} columns={columns} emptyMessage="Your activity log is ready for its first entry." />
}

function ResourceView({ title, eyebrow, payload, error, columns, emptyMessage }) {
  return <section className="resource-view"><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><span className="section-tag">Live API</span></div>{error ? <div className="alert alert-warning">{error}</div> : <ResourceTable payload={payload} columns={columns} emptyMessage={emptyMessage} />}</section>
}
