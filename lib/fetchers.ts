import axios from 'axios'

export async function baseFetcher<T>(url: string): Promise<T> {
  return axios.get(url).then((res): T => res.data)
}
