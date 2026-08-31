import { getItems, getPageInfo } from '../api'

function formatValue(value) {
  if (value == null) return '-'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

export default function ResourceTable({ payload, columns, emptyMessage }) {
  const items = getItems(payload)
  const pageInfo = getPageInfo(payload)

  return (
    <div className="resource-panel">
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              {columns.map((column) => <th key={column.key}>{column.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan={columns.length} className="empty-state">{emptyMessage}</td></tr>
            ) : items.map((item, index) => (
              <tr key={item._id ?? item.id ?? index}>
                {columns.map((column) => <td key={column.key}>{formatValue(item[column.key])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span>{pageInfo.total == null ? `${items.length} records` : `${pageInfo.total} records`}</span>
        <span>Page {pageInfo.page} of {pageInfo.pages}</span>
      </div>
    </div>
  )
}
