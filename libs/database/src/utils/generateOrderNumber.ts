import { customAlphabet } from 'nanoid';

export const generateOrderNumber = customAlphabet('1234567890abcdef', 12);
