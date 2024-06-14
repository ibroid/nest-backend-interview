/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MembersService {

  constructor(private prisma: PrismaService) { }

  create(createMemberDto: CreateMemberDto) {
    return this.prisma.members.create({
      data: {
        ...createMemberDto,
        code: this.generateCodeMember(createMemberDto.name)
      }
    })
  }

  findAll() {
    return this.prisma.members.findMany()
  }

  findOne(id: number) {
    return this.prisma.members.findFirstOrThrow({
      where: {
        id
      },
      include: {
        borrows: true,
        penalty: true,
        _count: true
      }
    })
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    this.prisma.members.update({
      data: {
        ...updateMemberDto, code: this.generateCodeMember(updateMemberDto.name)
      },
      where: {
        id
      }
    })
  }

  remove(id: number) {
    return this.prisma.members.delete({
      where: {
        id
      }
    })
  }

  private generateCodeMember(name: string) {
    const names = name.split(' ');
    let firstLetter: string = "";
    names.forEach(n => {
      firstLetter += n.charAt(0).toUpperCase();
    })
    return firstLetter + Math.floor(Math.random() * 10).toString();
  }
}
