import { Body, Controller, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // update user information
  @Put('/update')
  async updateUser(@Body() updateUser: UpdateUserDto) {
    return await this.userService.updateUser(updateUser);
  }
}
