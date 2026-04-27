import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SubareaService } from './subarea.service';
import { CreateSubareaDto } from './dto/create-subarea.dto';
import { UpdateSubareaDto } from './dto/update-subarea.dto';


@Controller('subarea')
export class SubareaController {
  constructor(private service: SubareaService) {}

  @Post()
  create(@Body() createSubareaDto: CreateSubareaDto) {
    return this.service.create(createSubareaDto);
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
  update(@Param('id') id: number, @Body() updateSubareaDto: UpdateSubareaDto) {
    return this.service.update(+id, updateSubareaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}