import { Controller, Get } from '@nestjs/common'

import { Public } from '@/decorators/is-public'

import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello()
  }
}
