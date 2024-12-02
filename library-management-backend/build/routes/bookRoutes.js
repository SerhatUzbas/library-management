"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching books' });
    }
});
// Get book by id
router.get('/:id', async (req, res) => {
    try {
        const book = await prisma.book.findUnique({
            where: { id: Number(req.params.id) },
            include: {
                borrows: {
                    include: {
                        user: true
                    }
                }
            }
        });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching book' });
    }
});
// Create new book
router.post('/', async (req, res) => {
    try {
        const { title, publishYear, writer, description, categoryId } = req.body;
        const book = await prisma.book.create({
            data: {
                title,
                publishYear,
                writer,
                description,
                status: 'AVAILABLE',
                categoryId
            }
        });
        res.status(201).json(book);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating book' });
    }
});
// Update book
router.put('/:id', async (req, res) => {
    try {
        const { title, publishYear, writer, description } = req.body;
        const book = await prisma.book.update({
            where: { id: Number(req.params.id) },
            data: {
                title,
                publishYear,
                writer,
                description
            }
        });
        res.json(book);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating book' });
    }
});
// Delete book
router.delete('/:id', async (req, res) => {
    try {
        await prisma.book.delete({
            where: { id: Number(req.params.id) }
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting book' });
    }
});
exports.default = router;
