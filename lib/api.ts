import useSWR from 'swr'

const API_URL = 'http://localhost:3001'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useShops() {
  const { data, error, mutate } = useSWR(`${API_URL}/shops`, fetcher)
  return {
    shops: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export function useShop(id: string) {
  const { data, error, mutate } = useSWR(`${API_URL}/shops/${id}`, fetcher)
  return {
    shop: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export async function createShop(shopData: any) {
  const response = await fetch(`${API_URL}/shops`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shopData),
  })
  return response.json()
}

export async function updateShop(id: string, shopData: any) {
  const response = await fetch(`${API_URL}/shops/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shopData),
  })
  return response.json()
}

export async function deleteShop(id: string) {
  const response = await fetch(`${API_URL}/shops/${id}`, {
    method: 'DELETE',
  })
  return response.json()
}

