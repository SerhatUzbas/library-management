"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class BorrowRepository {
    async create(userId, bookId) {
        return prisma.$transaction(async (prisma) => {
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
    }
    async return(borrowId, userRating) {
        return prisma.$transaction(async (prisma) => {
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
            await prisma.book.update({
                where: { id: borrow.bookId },
                data: { status: 'AVAILABLE' }
            });
            if (userRating) {
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
            }
            return borrow;
        });
    }
    async findAll() {
        return prisma.borrow.findMany({
            include: {
                user: true,
                book: true
            }
        });
    }
}
exports.BorrowRepository = BorrowRepository;
