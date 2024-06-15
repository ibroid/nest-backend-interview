import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({
    example: 'Harry Potter and the Prisoner of Lapas Sukamiskin',
    description: 'The title of the book',
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Albert Dadan Kojek',
    description: 'The author of the book',
    required: true,
  })
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    example: '1',
    description: 'Stock or Quantity of the book',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

}
