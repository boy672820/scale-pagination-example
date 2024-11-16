import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards';

export function Auth() {
  return UseGuards(AuthGuard);
}
