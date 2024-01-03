import useSWR from 'swr'
import { baseFetcher } from '@/lib/fetchers'

import type { SWRResponse } from 'swr'


type TUseZodProps<T> = {
	endpoint: string | null;
	config?: Parameters<typeof useSWR<T>>[2]
}

export function useFetch<T>({endpoint, config}: TUseZodProps<T>): SWRResponse<T> & {isSuccess: boolean} {
  const result = useSWR<T>(endpoint, baseFetcher, {revalidateOnFocus: false, ...config})

  if (!result.data || result.isLoading || result.isValidating) {
    return {...result, isSuccess: false}
  }

  if (result.error) {
    console.error(endpoint, result.error)
    return {...result, isSuccess: false}
  }


  // const parsedData = schema.safeParse(result.data)

  // if (!parsedData.success) {
  //   console.error(endpoint, parsedData.error)
  //   return {...result, isSuccess: false}
  // }

  return {...result, data: result.data, isSuccess: true}
}
