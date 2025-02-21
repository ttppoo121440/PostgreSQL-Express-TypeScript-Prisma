import prisma from '../prisma';

const skillModel = {
  getAll: async () => await prisma.skill.findMany(),
  create: async (name: string) =>
    await prisma.skill.create({
      data: {
        name,
      },
    }),
  findById: async (id: string) =>
    await prisma.skill.findUnique({
      where: { id },
    }),
  delete: async (id: string) =>
    await prisma.skill.delete({
      where: { id },
    }),
};
export default skillModel;
