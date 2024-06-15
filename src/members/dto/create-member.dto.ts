import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsEmail, IsNotEmpty } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateMemberDto {
  @ApiProperty({
    example: "Gina Jamiila",
    description: "Name of member",
    required: true,
    type: "string"
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "gjamiila@rmail.com",
    description: "Email of member",
    required: true,
    type: "email"
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
