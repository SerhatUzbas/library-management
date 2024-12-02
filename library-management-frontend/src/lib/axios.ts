import axios from 'axios'

const instance = axios.create({
	baseURL: `${__API_URL__}/api`,
	timeout: 60 * 2 * 1000,
})

instance.interceptors.request.use(
	(error) => error
)

instance.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => 	error?.response
	
)

export const http = instance
