import { AuthDataFromStorage } from '../contexts/AuthContext'

const buildHeaders = () => {
  const accessToken = AuthDataFromStorage()

  return {
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken ?? ''}`,
  }
}

const buildUrl = (path: string) => `${process.env.REACT_APP_ROOT_URL}/${path}`

export const post = async (path: string, data: Record<string, unknown>) => {
  return fetch(buildUrl(path), {
    body: JSON.stringify(data),
    method: 'POST',
    headers: buildHeaders(),
  })
}

export const get = async (path: string, params: Record<string, string>) => {
  return fetch(`${buildUrl(path)}?` + new URLSearchParams(params), {
    method: 'GET',
    headers: buildHeaders(),
  })
}

export const destroy = async (path: string) => {
  return fetch(buildUrl(path), {
    method: 'DELETE',
    headers: buildHeaders(),
  })
}
