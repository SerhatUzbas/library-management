import { PrismaClient, Book, Prisma, BookStatus } from '@prisma/client';

export class BookRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(page: number = 1, limit: number = 10, filters: { title?: string; writer?: string; status?: BookStatus; categoryId?: number } = {}): Promise<{ books: Book[], total: number, totalPages: number }> {
    const skip = (page - 1) * limit;

    const where: Prisma.BookWhereInput = {
      isActive: true,
      ...(filters.title && { title: { contains: filters.title, mode: 'insensitive' } }),
      ...(filters.writer && { writer: { contains: filters.writer, mode: 'insensitive' } }),
      ...(filters.status && { status: filters.status }),
      ...(filters.categoryId && { categoryId: filters.categoryId })
    };

    const [books, total] = await this.prisma.$transaction([
        this.prisma.book.findMany({
            where,
            skip,
            take: limit
        }),
        this.prisma.book.count({ where })
    ]);
    const totalPages = Math.ceil(total / limit);
    return { books, total, totalPages };
  }

  async findById(id: number): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where: { id },
      include: {
        borrows: {
          select: {
            user: true,
            userId:false,
            book: false,
            bookId: false,
            returnDate: true,
            userRating: true,
            borrowDate: true,
            id: true
          }
        }
      }
    });
  }

  async create(data: Prisma.BookCreateInput): Promise<Book> {
    return this.prisma.book.create({
      data
    });
  }

  async update(id: number, data: Prisma.BookUpdateInput): Promise<Book> {
    return this.prisma.book.update({
      where: { id },
      data
    });
  }

  async delete(id: number): Promise<Book> {
    const activeBorrows = await this.prisma.borrow.findFirst({
      where: {
        bookId: id,
        returnDate: null
      }
    });

    if (activeBorrows) {
      throw new Error('Cannot delete book while it is borrowed');
    }

    return this.prisma.book.delete({
      where: { id }
    });
  }

  async softDelete(id: number): Promise<Book> {
    const activeBorrows = await this.prisma.borrow.findFirst({
      where: {
        bookId: id,
        returnDate: null
      }
    });

    if (activeBorrows) {
      throw new Error('Cannot delete book while it is borrowed');
    }

    return this.prisma.book.update({
      where: { id },
      data: {
        isActive: false
      }
    });
  }
} 