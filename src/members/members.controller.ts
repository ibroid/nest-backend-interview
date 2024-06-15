/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @ApiResponse({
    status: 201,
    description: 'Success, and return a new member data'
  })
  @ApiResponse({
    status: 400,
    description: 'Request Body Error, and return error message'
  })
  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Success, and return a list of member data'
  })
  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Success, and return one member data'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Update member data success, and return updated member data'
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete member data success.'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}
