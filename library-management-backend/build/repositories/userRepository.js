"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserRepository {
    async findAll() {
        return prisma.user.findMany({
            include: {
                borrows: true
            }
        });
    }
    async findById(id) {
        return prisma.user.findUnique({
            where: { id },
            include: {
                borrows: {
                    include: {
                        book: true
                    }
                }
            }
        });
    }
    async create(data) {
        return prisma.user.create({
            data
        });
    }
    async update(id, data) {
        return prisma.user.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        return prisma.user.delete({
            where: { id }
        });
    }
}
exports.UserRepository = UserRepository;
