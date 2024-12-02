import { AxiosRequestConfig } from 'axios'
import BaseService from './BaseService'
import { http } from '@/lib/axios'
import { UserDTO } from '@/lib/types'
 
class UserService extends BaseService {

	getUsers (params: { name: string; page: number }, options?: AxiosRequestConfig) {
		return http.get(`users/${this._query(params)}`, options)
	}

	getUser(id: string, options?: AxiosRequestConfig) {
		return http.get(`users/${id}`, options)
	}

	createUser(data: UserDTO, options?: AxiosRequestConfig) {
		return http.post(`users/`, data, options)
	}

	getUserOptions(options?: AxiosRequestConfig) {
		return http.get(`users/options/`, options)
	}

	softDeleteUser(id: string, options?: AxiosRequestConfig) {
		return http.put(`users/${id}/remove`, options)
	}
}

export default new UserService()
