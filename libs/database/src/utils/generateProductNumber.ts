import { customAlphabet } from 'nanoid';

export const generateProductNumber = customAlphabet('1234567890abcdef', 7);
