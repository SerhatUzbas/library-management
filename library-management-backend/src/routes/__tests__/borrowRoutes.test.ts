import request from 'supertest'
import { BorrowRepository } from '../../repositories/borrowRepository'
import app from '../../app'

// Mock the BorrowRepository
jest.mock('../../repositories/borrowRepository')

describe('Borrow Routes', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	describe('POST /', () => {
		it('should create a new borrow successfully', async () => {
			const mockBorrow = {
				id: 1,
				userId: 1,
				bookId: 1,
				borrowDate: new Date(),
				returnDate: null,
				userRating: null,
				isActive: true,
			}

			const returnMock = {
				id: 1,
				userId: 1,
				bookId: 1,
				borrowDate: new Date().toISOString(),
				returnDate: null,
				userRating: null,
				isActive: true,
			}

			// Mock the create method
			const mockCreate = jest.spyOn(BorrowRepository.prototype, 'create')
			mockCreate.mockResolvedValue(mockBorrow)

			const response = await request(app).post('/api/borrows').send({
				userId: 1,
				bookId: 1,
			})

			expect(response.status).toBe(201)
			expect(response.body).toEqual({
				success: true,
				status: 201,
				message: 'Book borrowed successfully',
				data: returnMock,
			})
			expect(mockCreate).toHaveBeenCalledWith(1, 1)
		})

		it('should handle errors when creating a borrow', async () => {
			// Mock the create method to throw an error
			const mockCreate = jest.spyOn(BorrowRepository.prototype, 'create')
			mockCreate.mockRejectedValue(new Error('Database error'))

			const response = await request(app).post('/api/borrows').send({
				userId: 1,
				bookId: 1,
			})

			expect(response.status).toBe(500)
			expect(response.body).toEqual({
				success: false,
				status: 500,
				message: 'Error borrowing book',
				data: null,
			})
		})
	})
})
