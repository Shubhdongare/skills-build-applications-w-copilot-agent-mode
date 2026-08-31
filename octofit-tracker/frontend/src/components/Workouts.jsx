import { useEffect, useState } from 'react'
import { fetchResource } from '../api'
import ResourceTable from './ResourceTable'

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'duration', label: 'Duration' },
]

export default function Workouts() {
  const [payload, setPayload] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchResource('workouts').then(setPayload).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourceView title="Workouts" eyebrow="Your plan" payload={payload} error={error} columns={columns} emptyMessage="Personalized workouts will appear here." />
}

function ResourceView({ title, eyebrow, payload, error, columns, emptyMessage }) {
  return <section className="resource-view"><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><span className="section-tag">Live API</span></div>{error ? <div className="alert alert-warning">{error}</div> : <ResourceTable payload={payload} columns={columns} emptyMessage={emptyMessage} />}</section>
}
