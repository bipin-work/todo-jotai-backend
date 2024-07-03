import { PrismaClient, Task } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (userId: string): Promise<Task[]> => {
  return prisma.task.findMany({
    where: {
      userId,
    },
  });
};

export const addTask = async (userId: string, task: Task) => {
  return prisma.task.create({
    data: {
      ...task,
      userId,
    },
  });
};

export const getTaskById = async (
  userId: string,
  id: string
): Promise<Task | null> => {
  return prisma.task.findUnique({
    where: { id, userId },
  });
};

export const updateTaskById = async (
  userId: string,
  id: string,
  task: Task
) => {
  return prisma.task.update({
    where: { id, userId },
    data: task,
  });
};

export const deleteTaskById = async (userId: string, id: string) => {
  return prisma.task.delete({
    where: { id, userId },
  });
};
