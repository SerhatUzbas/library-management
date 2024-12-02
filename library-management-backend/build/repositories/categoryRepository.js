"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const client_1 = require("@prisma/client");
class CategoryRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async getAllCategories() {
        return this.prisma.category.findMany();
    }
    async getCategoryById(id) {
        return this.prisma.category.findUnique({
            where: { id },
        });
    }
    async createCategory(data) {
        return this.prisma.category.create({
            data,
        });
    }
    async updateCategory(id, data) {
        return this.prisma.category.update({
            where: { id },
            data,
        });
    }
    async deleteCategory(id) {
        return this.prisma.category.delete({
            where: { id },
        });
    }
}
exports.CategoryRepository = CategoryRepository;
