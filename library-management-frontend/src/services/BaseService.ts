 
class BaseService {
	_query(params: Record<string, string|any>) {
		const query = new URLSearchParams(params)
		return `?${query.toString()}`
	}
 }

export default BaseService
