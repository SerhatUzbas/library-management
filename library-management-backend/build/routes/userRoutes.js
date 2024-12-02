"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                borrows: true
            }
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});
// Get user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) },
            include: {
                borrows: {
                    include: {
                        book: true
                    }
                }
            }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});
// Create new user
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const user = await prisma.user.create({
            data: { name }
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});
// Update user
router.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const user = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: { name }
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
});
// Delete user
router.delete('/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: { id: Number(req.params.id) }
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});
exports.default = router;
