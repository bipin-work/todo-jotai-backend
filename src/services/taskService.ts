import { PrismaClient, Task } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (): Promise<Task[]> => {
  return prisma.task.findMany();
};

export const addTask = async (task: Task) => {
  return prisma.task.create({
    data: task,
  });
};

export const getTaskById = async (id: string): Promise<Task | null> => {
  return prisma.task.findUnique({
    where: { id },
  });
};

export const updateTaskById = async (id: string, task: Task) => {
  return prisma.task.update({
    where: { id },
    data: task,
  });
};

export const deleteTaskById = async (id: string) => {
  return prisma.task.delete({
    where: { id },
  });
};
