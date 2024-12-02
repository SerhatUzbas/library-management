import request from 'supertest'
import app from '../../app'
import { BookRepository } from '../../repositories/bookRepository'

import { BookStatus } from '@prisma/client'

jest.mock('../../repositories/bookRepository')

describe('GET /books', () => {
	const mockBooks = [
		{
			id: 1,
			title: 'Test Book 1',
			writer: 'Test Author 1',
			publishYear: '2023',
			status: BookStatus.AVAILABLE,
			description: 'Test description 1',
			categoryId: 1,
			averageRating: 0,
			isActive: true,
		},
		{
			id: 2,
			title: 'Test Book 2',
			writer: 'Test Author 2',
			publishYear: '2023',
			status: BookStatus.BORROWED,
			description: 'Test description 2',
			categoryId: 1,
			averageRating: 0,
			isActive: true,
		},
	]

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should return a list of books with pagination', async () => {
		const mockResponse = {
			books: mockBooks,
			total: 2,
			totalPages: 1,
		}

		jest.spyOn(BookRepository.prototype, 'findAll').mockResolvedValue(mockResponse)

		const response = await request(app).get('/api/books').query({ page: 1, limit: 10 })

		expect(response.status).toBe(200)
		expect(response.body.success).toBe(true)
		expect(response.body.data).toEqual({
			books: mockBooks,
			total: 2,
			totalPages: 1,
		})
	})

	it('should apply filters correctly', async () => {
		const filters = {
			title: 'Test',
			writer: 'Author',
			status: 'AVAILABLE',
			categoryId: '1',
		}

		const mockResponse = {
			books: [mockBooks[0]],
			total: 1,
			totalPages: 1,
		}

		jest.spyOn(BookRepository.prototype, 'findAll').mockResolvedValue(mockResponse)

		const response = await request(app).get('/api/books').query(filters)

		expect(response.status).toBe(200)
		expect(response.body.success).toBe(true)
		expect(response.body.data.books).toHaveLength(1)
		expect(BookRepository.prototype.findAll).toHaveBeenCalledWith(
			1, // default page
			10, // default limit
			expect.objectContaining({
				title: 'Test',
				writer: 'Author',
				status: 'AVAILABLE',
				categoryId: 1,
			})
		)
	})

	it('should handle errors gracefully', async () => {
		jest.spyOn(BookRepository.prototype, 'findAll').mockRejectedValue(new Error('Database error'))

		const response = await request(app).get('/api/books')

		expect(response.status).toBe(500)
		expect(response.body.success).toBe(false)
		expect(response.body.message).toBe('Error fetching books')
	})
})
