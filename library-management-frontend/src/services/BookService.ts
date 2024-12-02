import { AxiosRequestConfig } from 'axios'
import BaseService from './BaseService'
import { http } from '@/lib/axios'
import { Book, BookDTO, CategoryDTO, ResponseType } from '@/lib/types'

class BookService extends BaseService {
	getBooks(filter: { title?: string; writer?: string; status?: string; categoryId?: string; page?: number; limit?: number }, options?: AxiosRequestConfig) {
		return http.get<ResponseType<{ total: number; totalPages: number; books: Book[] }>>(`books${this._query(filter)}`, options)
	}

	getBook(id: string, options?: AxiosRequestConfig) {
		return http.get(`books/${id}`, options)
	}

	createBook(data: BookDTO, options?: AxiosRequestConfig) {
		return http.post(`books/`, data, options)
	}

	updateBook(id: number, data: BookDTO, options?: AxiosRequestConfig) {
		return http.put(`books/${id}`, data, options)
	}

	getCategories(options?: AxiosRequestConfig) {
		return http.get(`categories/`, options)
	}

	getCategoryOptions(options?: AxiosRequestConfig) {
		return http.get(`categories/options`, options)
	}

	createCategory(data: CategoryDTO, options?: AxiosRequestConfig) {
		return http.post(`categories/`, data, options)
	}

	updateCategory(id: number, data: CategoryDTO, options?: AxiosRequestConfig) {
		return http.put(`categories/${id}`, data, options)
	}

	deleteCategory(id: number, options?: AxiosRequestConfig) {
		return http.delete(`categories/${id}`, options)
	}

	softDeleteBook(id: string, options?: AxiosRequestConfig) {
		return http.put(`books/${id}/remove`, options)
	}
}

export default new BookService()
