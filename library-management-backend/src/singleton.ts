import { PrismaClient } from '@prisma/client'
import { mockDeep } from 'jest-mock-extended'

export const prismaMock = mockDeep<PrismaClient>()

jest.mock('./lib/prisma', () => ({
	__esModule: true,
	default: () => prismaMock,
}))
