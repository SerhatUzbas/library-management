import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { ResponseType, SelectData, User } from '@/lib/types'
import BookService from '@/services/BookService'
import { AxiosResponse } from 'axios'
import UserService from '@/services/UserService'

type AxiosResponseType<T = any> = AxiosResponse<ResponseType<T>>

type QueryResponseType<T = any> = UseQueryResult<AxiosResponseType<T>, unknown>

type PurifiedQueryOptions<T = any> = Omit<UseQueryOptions<AxiosResponseType<T>>, 'queryKey' | 'queryFn'>

export const useCategoryOptionsQuery = <T=SelectData>(options?: PurifiedQueryOptions<AxiosResponseType<T>>): QueryResponseType => { 
	return useQuery({
		queryKey: ['globalCategoryOptions'],
		queryFn: () => BookService.getCategoryOptions(),
		// staleTime:Infinity,
		// cacheTime:Infinity,
		...options,
	}) 
} //prettier-ignore

export const useUserListQuery = <T=User[]>(options?: PurifiedQueryOptions<AxiosResponseType<T>>): QueryResponseType => { 
	return useQuery({
		queryKey: ['globalUserOptionsaa'],
		queryFn: () => UserService.getUserOptions(),
		...options,
	}) 
} //prettier-ignore
