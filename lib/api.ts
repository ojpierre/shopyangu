import useSWR, { mutate } from 'swr'

const API_URL = 'http://localhost:3001'

const fetcher = async (url: string) => {
  const token = localStorage.getItem('token')
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  return response.json()
}

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
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/shops`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(shopData),
  })
  const newShop = await response.json()
  mutate(`${API_URL}/shops`)
  return newShop
}

export async function updateShop(id: string, shopData: any) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/shops/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(shopData),
  })
  const updatedShop = await response.json()
  mutate(`${API_URL}/shops`)
  mutate(`${API_URL}/shops/${id}`)
  return updatedShop
}

export async function deleteShop(id: string) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/shops/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  await response.json()
  mutate(`${API_URL}/shops`)
}

// Product API functions
export interface Product {
  id: string;
  name: string;
  price: number;
  stockLevel: number;
  description: string;
  image: string;
  shopId: string;
}

export function useProducts() {
  const { data, error, mutate } = useSWR(`${API_URL}/products`, fetcher)
  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export function useProduct(id: string) {
  const { data, error, mutate } = useSWR(`${API_URL}/products/${id}`, fetcher)
  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export async function createProduct(productData: any) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  })
  const newProduct = await response.json()
  mutate(`${API_URL}/products`)
  return newProduct
}

export async function updateProduct(id: string, productData: any) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  })
  const updatedProduct = await response.json()
  mutate(`${API_URL}/products`)
  mutate(`${API_URL}/products/${id}`)
  return updatedProduct
}

export async function deleteProduct(id: string) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  await response.json()
  mutate(`${API_URL}/products`)
}

export function useSalesData() {
  const { data, error, mutate } = useSWR(`${API_URL}/sales`, fetcher)
  return {
    salesData: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export function useTopSellingProducts() {
  const { data, error, mutate } = useSWR(`${API_URL}/products/top-selling`, fetcher)
  return {
    topSellingProducts: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export function useOrders() {
  const { data, error, mutate } = useSWR(`${API_URL}/orders`, fetcher)
  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export function useOrder(id: string) {
  const { data, error, mutate } = useSWR(`${API_URL}/orders/${id}`, fetcher)
  return {
    order: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export async function updateOrderStatus(id: string, status: string) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  })
  const updatedOrder = await response.json()
  mutate(`${API_URL}/orders`)
  mutate(`${API_URL}/orders/${id}`)
  return updatedOrder
}


