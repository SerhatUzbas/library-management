"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// Borrow a book
router.post('/', async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        // Check if book is available
        const book = await prisma.book.findUnique({
            where: { id: bookId }
        });
        if (!book || book.status === 'BORROWED') {
            return res.status(400).json({ error: 'Book is not available' });
        }
        // Create borrow record and update book status
        const borrow = await prisma.$transaction(async (prisma) => {
            const borrow = await prisma.borrow.create({
                data: {
                    userId,
                    bookId,
                    borrowDate: new Date()
                }
            });
            await prisma.book.update({
                where: { id: bookId },
                data: { status: 'BORROWED' }
            });
            return borrow;
        });
        res.status(201).json(borrow);
    }
    catch (error) {
        res.status(500).json({ error: 'Error borrowing book' });
    }
});
// Return a book
router.put('/:id/return', async (req, res) => {
    try {
        const { userRating } = req.body;
        const borrowId = Number(req.params.id);
        const updatedBorrow = await prisma.$transaction(async (prisma) => {
            const borrow = await prisma.borrow.update({
                where: { id: borrowId },
                data: {
                    returnDate: new Date(),
                    userRating
                },
                include: {
                    book: true
                }
            });
            // Update book status
            await prisma.book.update({
                where: { id: borrow.bookId },
                data: { status: 'AVAILABLE' }
            });
            // Update average rating
            const allRatings = await prisma.borrow.findMany({
                where: {
                    bookId: borrow.bookId,
                    userRating: { not: null }
                },
                select: { userRating: true }
            });
            const averageRating = allRatings.reduce((acc, curr) => acc + (curr.userRating || 0), 0) / allRatings.length;
            await prisma.book.update({
                where: { id: borrow.bookId },
                data: { averageRating }
            });
            return borrow;
        });
        res.json(updatedBorrow);
    }
    catch (error) {
        res.status(500).json({ error: 'Error returning book' });
    }
});
// Get all borrows
router.get('/', async (req, res) => {
    try {
        const borrows = await prisma.borrow.findMany({
            include: {
                user: true,
                book: true
            }
        });
        res.json(borrows);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching borrows' });
    }
});
exports.default = router;
