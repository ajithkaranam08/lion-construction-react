import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database helper functions
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

export const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log('Database disconnected successfully');
  } catch (error) {
    console.error('Database disconnection failed:', error);
  }
};

// Generic CRUD operations
export const createRecord = async (model, data) => {
  try {
    return await prisma[model].create({ data });
  } catch (error) {
    console.error(`Error creating ${model}:`, error);
    throw error;
  }
};

export const findMany = async (model, options = {}) => {
  try {
    return await prisma[model].findMany(options);
  } catch (error) {
    console.error(`Error finding ${model}:`, error);
    throw error;
  }
};

export const findUnique = async (model, options) => {
  try {
    return await prisma[model].findUnique(options);
  } catch (error) {
    console.error(`Error finding unique ${model}:`, error);
    throw error;
  }
};

export const updateRecord = async (model, options) => {
  try {
    return await prisma[model].update(options);
  } catch (error) {
    console.error(`Error updating ${model}:`, error);
    throw error;
  }
};

export const deleteRecord = async (model, options) => {
  try {
    return await prisma[model].delete(options);
  } catch (error) {
    console.error(`Error deleting ${model}:`, error);
    throw error;
  }
};

export const countRecords = async (model, options = {}) => {
  try {
    return await prisma[model].count(options);
  } catch (error) {
    console.error(`Error counting ${model}:`, error);
    throw error;
  }
};
