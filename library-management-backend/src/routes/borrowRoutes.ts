import express from 'express'
import { BorrowRepository } from '../repositories/borrowRepository'
import { ApiResponse } from '../interfaces/ApiResponse'

const router = express.Router()
const borrowRepository = new BorrowRepository()

router.post('/', async (req, res) => {
	try {
		const { userId, bookId } = req.body

		const borrow = await borrowRepository.create(userId, bookId)

		const response: ApiResponse<typeof borrow> = {
			success: true,
			status: 201,
			message: 'Book borrowed successfully',
			data: borrow,
		}

		res.status(201).json(response)
	} catch (error) {
		const response: ApiResponse<null> = {
			success: false,
			status: 500,
			message: 'Error borrowing book',
			data: null,
		}

		res.status(500).json(response)
	}
})

router.put('/:id/return', async (req, res) => {
	try {
		const borrowId = Number(req.params.id)

		const updatedBorrow = await borrowRepository.return(borrowId)

		res.success('Book returned successfully', updatedBorrow)
	} catch (error) {
		res.error('Error returning book', 500)
	}
})

router.get('/', async (req, res) => {
	try {
		const borrows = await borrowRepository.findAll()
		res.json(borrows)
	} catch (error) {
		res.status(500).json({ error: 'Error fetching borrows' })
	}
})

export default router
