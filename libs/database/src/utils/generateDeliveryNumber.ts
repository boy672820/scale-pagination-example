import { customAlphabet } from 'nanoid';

export const generateDeliveryNumber = customAlphabet('1234567890abcdef', 12);
