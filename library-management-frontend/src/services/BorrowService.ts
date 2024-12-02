import { AxiosRequestConfig } from 'axios'
import BaseService from './BaseService'
import { http } from '@/lib/axios'
import { BorrowDTO } from '@/lib/types'

class BorrowService extends BaseService {
	borrowBook(data: BorrowDTO, options?: AxiosRequestConfig) {
		return http.post(`borrows/`, data, options)
	}

	returnBook(id: number, options?: AxiosRequestConfig) {
		return http.put(`borrows/${id}/return`, options)
	}
}

export default new BorrowService()
