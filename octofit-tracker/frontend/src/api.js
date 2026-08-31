const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  return payload.data ?? payload.results ?? payload.items ?? payload.docs ?? []
}

export function getPageInfo(payload) {
  if (!payload || Array.isArray(payload) || typeof payload !== 'object') {
    return { page: 1, pages: 1, total: null }
  }

  const pagination = payload.pagination ?? payload.meta ?? payload
  return {
    page: Number(pagination.page ?? pagination.currentPage ?? 1),
    pages: Number(pagination.pages ?? pagination.totalPages ?? 1),
    total: pagination.total == null ? null : Number(pagination.total),
  }
}

export async function fetchResource(resource) {
  const response = await fetch(`${apiBaseUrl}/${resource}/`)
  if (!response.ok) throw new Error(`Unable to load ${resource}`)
  return response.json()
}

export async function fetchUrl(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Unable to load ${url}`)
  return response.json()
}
