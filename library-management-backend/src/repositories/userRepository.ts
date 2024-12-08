import { PrismaClient } from '@prisma/client';
import { IUser } from '../models/types';

const prisma = new PrismaClient();

export class UserRepository {
  async findAll(page: number = 1, limit: number = 12, name?: string) {
    const skip = (page - 1) * limit;
    
    const whereClause = {
      isActive: true,
      ...(name ? {
        name: {
          contains: name,
          mode: 'insensitive' as const
        }
      } : {})
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        include: {
          borrows: {
            include: {
              book: true
            }
          }
        },
        orderBy: {
          name: 'asc'
        },
        skip,
        take: limit
      }),
      prisma.user.count({
        where: whereClause
      })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      users: users.map(user => {
        const { borrows, ...rest } = user;
        return {
          ...rest,
          currentBorrows: borrows.filter(borrow => borrow.returnDate === null),
          pastBorrows: borrows.filter(borrow => borrow.returnDate !== null)
        };
      }),
      total,
      totalPages,
      page,
      limit
      
    };
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        borrows: {
          include: {
            book: true
          }
          }
        }
    }).then(user => {
      if (!user) {
        return null;
      }
      const { borrows, ...rest } = user;
      return {
        ...rest,
        currentBorrows: borrows.filter(borrow => borrow.returnDate === null),
        pastBorrows: borrows.filter(borrow => borrow.returnDate !== null)
      };
    });
  }

  async create(data: Omit<IUser, 'id'>) {
    return prisma.user.create({
      data
    });
  }

  async update(id: number, data: Partial<IUser>) {
    return prisma.user.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    const activeBorrows = await prisma.borrow.findFirst({
      where: {
        userId: id,
        returnDate: null
      }
    });

    if (activeBorrows) {
      throw new Error('Cannot delete user with active borrows');
    }

    return prisma.user.delete({
      where: { id }
    });
  }

  async softDelete(id: number) {
    const activeBorrows = await prisma.borrow.findFirst({
      where: {
        userId: id,
        returnDate: null
      }
    });

    if (activeBorrows) {
      throw new Error('Cannot delete user with active borrows');
    }

    return prisma.user.update({
      where: { id },
      data: {
        isActive: false
      }
    });
  }
} 