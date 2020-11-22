import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  lastname: string;

  @ApiProperty()
  firstname: string;
}
