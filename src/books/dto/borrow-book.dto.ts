/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class BorrowBookDto {
  @IsNotEmpty()
  book_code: string;

  @IsNotEmpty()
  member_code: string;
}