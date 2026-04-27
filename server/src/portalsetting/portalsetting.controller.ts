import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PortalsettingService } from './portalsetting.service';

@Controller('Portalsetting')
export class PortalsettingController {
  constructor(private service: PortalsettingService) {}

  @Post()
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: any) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}