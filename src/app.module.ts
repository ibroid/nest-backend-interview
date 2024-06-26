import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [BooksModule, MembersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
