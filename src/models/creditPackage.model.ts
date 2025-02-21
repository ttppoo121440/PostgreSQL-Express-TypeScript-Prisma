import prisma from '../prisma';
import { creditPackageType } from '../schema/creditPackageSchema/types';

const creditPackageModel = {
  getAll: async () => await prisma.creditPackage.findMany(),
  create: async (data: creditPackageType) =>
    await prisma.creditPackage.create({
      data: data,
    }),
  findByName: async (name: string) =>
    await prisma.creditPackage.findFirst({
      where: { name },
    }),
  checkId: async (creditPackageId: string) => await prisma.creditPackage.findUnique({ where: { id: creditPackageId } }),
  delete: async (creditPackageId: string) => await prisma.creditPackage.delete({ where: { id: creditPackageId } }),
};

export default creditPackageModel;
