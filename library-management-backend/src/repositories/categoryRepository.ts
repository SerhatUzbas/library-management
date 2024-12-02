import { PrismaClient, Category } from '@prisma/client';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../models/types';

export class CategoryRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: {
        isActive: true
      }
    });
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async createCategory(data: CreateCategoryDTO): Promise<Category> {
    
    return this.prisma.category.create({
      data,
    });
  }

  async updateCategory(id: number, data: UpdateCategoryDTO): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: number): Promise<Category> {
    return this.prisma.category.delete({
      where: { id },
    });
  }

  async softDelete(id: number): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: {
        isActive: false
      }
    });
  }
} 