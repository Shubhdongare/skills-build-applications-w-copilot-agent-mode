import { useEffect, useState } from 'react'
import { fetchUrl } from '../api'
import ResourceTable from './ResourceTable'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'name', label: 'Athlete' },
  { key: 'points', label: 'Points' },
]

export default function Leaderboard() {
  const [payload, setPayload] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchUrl(leaderboardEndpoint).then(setPayload).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourceView title="Leaderboard" eyebrow="Competition" payload={payload} error={error} columns={columns} emptyMessage="The leaderboard will appear when scores are recorded." />
}

function ResourceView({ title, eyebrow, payload, error, columns, emptyMessage }) {
  return <section className="resource-view"><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><span className="section-tag">Live API</span></div>{error ? <div className="alert alert-warning">{error}</div> : <ResourceTable payload={payload} columns={columns} emptyMessage={emptyMessage} />}</section>
}
