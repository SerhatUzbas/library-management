import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class BorrowRepository {
  async create(userId: number, bookId: number) {
    return prisma.$transaction(async (prisma) => {
      const borrow = await prisma.borrow.create({
        data: {
          userId,
          bookId,
          borrowDate: new Date(),
          userRating: Math.floor(Math.random() * 4) + 1
          
        }
      });

      if (borrow) {
        await prisma.book.update({
          where: { id: bookId },
          data: { status: 'BORROWED' }
        });
      }

      return borrow;
    });
  }

  async return(borrowId: number) {
    return prisma.$transaction(async (prisma) => {
      const borrow = await prisma.borrow.update({
        where: { id: borrowId },
        data: {
          returnDate: new Date(),
          userRating: Math.floor(Math.random() * 4) + 1
        },
        include: {
          book: true
        }
      });

      if (borrow) {
        await prisma.book.update({
        where: { id: borrow.bookId },
          data: { status: 'AVAILABLE' }
        });
      }

      if (borrow) {
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