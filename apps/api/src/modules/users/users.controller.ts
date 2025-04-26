import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { Public } from '@/decorators/is-public'

import { RegisterDto } from './dtos/register.dto'
import { UpdateDto } from './dtos/update.dto'
import { UsersService } from './users.service'

@Controller('users')
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Post('register')
  @Public()
  register(@Body() body: RegisterDto) {
    return this.usersService.register(body)
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateDto) {
    return this.usersService.update(+id, body)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
