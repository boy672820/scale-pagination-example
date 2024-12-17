import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth() {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard));
}
