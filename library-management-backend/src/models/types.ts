export interface IBook {
	id: number
	title: string
	publishYear: string
	writer: string
	description: string
	status: 'AVAILABLE' | 'BORROWED'
	categoryId: number
	averageRating?: number
	isActive: boolean
}

export interface IUser {
	id: number
	name: string
}

export interface IBorrow {
	id: number
	userId: number
	bookId: number
	borrowDate: Date
	returnDate?: Date
	userRating?: number
}

export interface ICategory {
	id: number
	name: string
}

export interface CreateCategoryDTO {
	name: string
}

export interface UpdateCategoryDTO {
	name?: string
}
