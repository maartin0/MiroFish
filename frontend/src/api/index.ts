import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

// Axios instance typed to return unwrapped response bodies via interceptor
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 300000, // 5-minute timeout (ontology generation can take a while)
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: unknown) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor — unwraps response.data and forwards it as the resolved value
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data

    if (!res.success && res.success !== undefined) {
      console.error('API Error:', res.error || res.message || 'Unknown error')
      return Promise.reject(new Error(res.error || res.message || 'Error'))
    }

    return res
  },
  (error: unknown) => {
    console.error('Response error:', error)

    if (
      error !== null &&
      typeof error === 'object' &&
      'code' in error &&
      'message' in error &&
      (error as { code: string }).code === 'ECONNABORTED' &&
      typeof (error as { message: string }).message === 'string' &&
      (error as { message: string }).message.includes('timeout')
    ) {
      console.error('Request timeout')
    }

    if (
      error !== null &&
      typeof error === 'object' &&
      'message' in error &&
      (error as { message: string }).message === 'Network Error'
    ) {
      console.error('Network error - please check your connection')
    }

    return Promise.reject(error)
  }
)

export const requestWithRetry = async <T>(
  requestFn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      console.warn(`Request failed, retrying (${i + 1}/${maxRetries})...`)
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
    }
  }
  // unreachable, but TypeScript needs a return
  throw new Error('requestWithRetry: exhausted retries')
}

export default service
