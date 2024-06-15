/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BorrowBookDto {
  @ApiProperty({
    example: 'TH01',
    description: 'Book code from book table',
    required: true,
  })
  @IsNotEmpty()
  book_code: string;

  @ApiProperty({
    example: 'TH01',
    description: 'Member code from member table',
    required: true,
  })
  @IsNotEmpty()
  member_code: string;
}