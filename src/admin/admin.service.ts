import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminService {
  isAdministratorCheck(roleId: number) {
    if (roleId !== 2) {
      throw new ForbiddenException(
        'Only administrators are allowed to use this endpoint.',
      );
    }
  }
}
