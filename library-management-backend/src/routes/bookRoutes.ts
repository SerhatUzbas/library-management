import express from 'express';
import { BookRepository } from '../repositories/bookRepository';
import { BookStatus } from '@prisma/client';

const router = express.Router();
const bookRepository = new BookRepository();


router.get('/', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const filters = {
      title: req.query.title as string,
      writer: req.query.writer as string,
      status: req.query.status ? (req.query.status as BookStatus) : undefined,
      categoryId: req.query.categoryId ? Number(req.query.categoryId) : undefined
    };
    const { books, total, totalPages } = await bookRepository.findAll(page, limit, filters);
    res.success('Books retrieved successfully', { books, total, totalPages });
  } catch (error) {
    
    res.error('Error fetching books', 500);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const book = await bookRepository.findById(Number(req.params.id));
    if (!book) {
      return res.error('Book not found', 404);
    }
    res.success('Book retrieved successfully', book);
  } catch (error) {
    res.error('Error fetching book', 500);
  }
});


router.post('/', async (req, res) => {
  try {
    const { title, publishYear, writer, description, categoryId } = req.body;
    const book = await bookRepository.create({
      title,
      publishYear,
      writer,
      description,
      status: 'AVAILABLE',
      category: {
        connect: { id: categoryId }
      }
    });
    res.success('Book created successfully', book, 201);
  } catch (error) {
    res.error('Error creating book', 500);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const bookId = Number(req.params.id);
    const book = await bookRepository.update(bookId, req.body);
    if (!book) {
      return res.error('Book not found', 404);
    }
    res.success('Book updated successfully', book);
  } catch (error) {
    res.error('Error updating book', 500);
  }
});


router.put('/:id/remove', async (req, res) => {
  try {
    const bookId = Number(req.params.id);
    const book = await bookRepository.softDelete(bookId);
    if (!book) {
      return res.error('Book not found', 404);
    }
    res.success('Book soft deleted successfully', book);
  } catch (error) {
    if (error instanceof Error && error.message === 'Cannot delete book while it is borrowed') {
      return res.error(error.message, 400);
    }
    res.error('Error soft deleting book', 500);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await bookRepository.delete(Number(req.params.id));
    res.success('Book deleted successfully', null, 204);
  } catch (error) {
    if (error instanceof Error && error.message === 'Cannot delete book while it is borrowed') {
      return res.error(error.message, 400);
    }
    res.error('Error deleting book', 500);
  }
});

export default router; 