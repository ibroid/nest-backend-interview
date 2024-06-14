/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BorrowBookDto } from './dto/borrow-book.dto';
import Ddiff from "date-diff";

@Injectable()
export class BooksService {

  constructor(private prisma: PrismaService) { }

  create(createBookDto: CreateBookDto) {
    return this.prisma.books.create({
      data: {
        ...createBookDto,
        code: this.generateCodeBook(createBookDto.title)
      }
    })
  }

  borrowBook(body: BorrowBookDto) {
    return this.prisma.$transaction(async (tx) => {

      const dbresult = await Promise.allSettled([
        tx.members.findUniqueOrThrow({
          where: {
            code: body.member_code
          },
          include: {
            borrows: {
              where: {
                status: 1
              }
            },
            penalty: {
              where: {
                penalty_end: {
                  gte: new Date(Date.now())
                }
              }
            }
          }
        }),
        tx.books.findUniqueOrThrow({
          where: {
            code: body.book_code
          },
          include: {
            borrows: {
              where: {
                status: 1
              }
            }
          }
        })
      ])

      const member = dbresult[0].status == "rejected" ? null : dbresult[0].value;
      const book = dbresult[1].status == "rejected" ? null : dbresult[1].value;

      if (!member || !book) {
        const errors = dbresult.filter(x => x.status == "rejected").map((x: PromiseRejectedResult) => x?.reason ?? "Unknown error");
        throw new HttpException("Something went wrong in the database." + errors, 500);
      }

      if (member.borrows.length == 2) {
        throw new HttpException('Member cannot borrow more than 2 books', 400);
      }

      if (member.penalty.length > 0) {
        throw new HttpException('Member is under penalized. Cannot borrow new book until penalty is over', 400);
      }

      if (book.borrows.length == book.stock) {
        throw new HttpException('Book is out of stock. Try another book', 400);
      }

      const checkSameBook = member.borrows.filter(b => b.book_id == book.id)
      if (checkSameBook.length > 0) {
        throw new HttpException('You already had this book', 400);
      }

      return await tx.borrowedBook.create({
        data: {
          book_id: book.id,
          member_id: member.id,
          borrow_time: new Date()
        }
      })

    })
  }

  returnBook(body: BorrowBookDto) {
    return this.prisma.$transaction(async (tx) => {

      const borrowedBook = await tx.borrowedBook.findFirstOrThrow({
        where: {
          book: {
            code: body.book_code
          },
          member: {
            code: body.member_code
          },
          status: 1
        },
        include: {
          book: true,
          member: true
        }
      }).catch(() => { throw new HttpException('Book not found', 404) })

      const ddiff = new Ddiff(new Date(), new Date(borrowedBook.borrow_time));

      let message: "Book returned.";
      let penalty: any;
      if (ddiff.days() > 7) {
        message += " .You have been penalized because you have not returned the book in 7 days. Please wait after 3 days.";

        penalty = await tx.penalty.create({
          data: {
            member_id: borrowedBook.member_id,
            penalty_start: new Date(),
            penalty_end: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000))
          }
        })
      }

      const newBorrowedBook = await tx.borrowedBook.update({
        where: {
          id: borrowedBook.id
        },
        data: {
          status: 0,
          returned_time: new Date(),
        }
      })

      return {
        message,
        data: {
          borrowed_book: newBorrowedBook,
          penalty
        }
      }
    })
  }

  findAll() {
    return this.prisma.books.findMany()
  }

  findOne(id: number) {
    return this.prisma.books.findFirstOrThrow({
      where: {
        id
      }
    });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.prisma.books.update({
      where: {
        id
      },
      data: {
        ...updateBookDto, code: this.generateCodeBook(updateBookDto.title)
      }
    })
  }

  remove(id: number) {
    return this.prisma.books.delete({
      where: {
        id
      }
    });
  }

  async availableBooks() {
    const borrowedBook = await this.prisma.borrowedBook.findMany({
      where: {
        status: 1
      }
    })

    const books = await this.prisma.books.findMany();

    const availabelBooks = books.map(book => {
      return {
        ...book,
        borrowed: borrowedBook.filter(x => x.book_id == book.id).length
      }
    }).filter((b: any) => b.borrowed < b.stock);

    return availabelBooks;
  }

  private generateCodeBook(title: string) {
    const words = title.split(' ');
    let code = '';
    words.forEach(word => {
      code += word.charAt(0).toUpperCase();
    })

    return code + "_" + Math.random().toString().slice(2, 4);
  }
}
