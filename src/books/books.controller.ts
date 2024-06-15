/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @ApiResponse({
    status: 201,
    description: 'Success, and return a new book data'
  })
  @ApiResponse({
    status: 400,
    description: 'Request Body Error, and return error message'
  })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Success, and return a list of book data'
  })
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Success, and return list of available book data. Available book is a book that has stock > 0, counted on borrowed book'
  })
  @Get('available')
  available() {
    return this.booksService.availableBooks();
  }

  @ApiResponse({
    status: 200,
    description: 'Success, and return one book data and member data'
  })
  @ApiResponse({
    status: 404,
    description: 'Not found, and return error message'
  })
  @ApiResponse({
    status: 400,
    description: 'Request Body Error, and return error message'
  })
  @Post('borrow')
  borrow(@Body() body: BorrowBookDto) {
    return this.booksService.borrowBook(body);
  }

  @ApiResponse({
    status: 200,
    description: 'Success, and return one book data and member data'
  })
  @ApiResponse({
    status: 404,
    description: 'Not found, and return error message'
  })
  @ApiResponse({
    status: 400,
    description: 'Request Body Error, and return error message'
  })
  @Post('return')
  return(@Body() body: BorrowBookDto) {
    return this.booksService.returnBook(body);
  }

  @ApiResponse({
    status: 200,
    description: 'Success, and return one book data'
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Update book data success, and return updated book data'
  })
  @ApiResponse({
    status: 404,
    description: 'Not found, and return error message'
  })
  @ApiResponse({
    status: 400,
    description: 'Request Body Error, and return error message'
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete book data success.'
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.booksService.remove(+id);
  }
}
