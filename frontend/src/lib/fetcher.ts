import axios from '~/lib/axios'
import { AxiosResponse } from 'axios'

export const fetcher = (url: string) => axios.get(url).then((res: AxiosResponse) => res.data)
