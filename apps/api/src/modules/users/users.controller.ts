import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common'

import { Public } from '@/decorators/is-public'

import { RegisterDto } from './dtos/register.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @Public()
  register(@Body() body: RegisterDto) {
    return this.usersService.register(body.username, body.password)
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: { username: string }) {
    return this.usersService.updateUser(+id, body.username)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id)
  }
}
