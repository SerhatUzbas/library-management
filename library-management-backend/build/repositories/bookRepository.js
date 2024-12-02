"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class BookRepository {
    async findAll() {
        return prisma.book.findMany({
            include: {
                category: true
            }
        });
    }
    async findById(id) {
        return prisma.book.findUnique({
            where: { id },
            include: {
                category: true,
                borrows: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async create(data) {
        return prisma.book.create({
            data: Object.assign(Object.assign({}, data), { status: 'AVAILABLE' })
        });
    }
    async update(id, data) {
        return prisma.book.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        return prisma.book.delete({
            where: { id }
        });
    }
}
exports.BookRepository = BookRepository;
