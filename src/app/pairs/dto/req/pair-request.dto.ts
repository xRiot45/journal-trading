import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class PairDto {
    @ApiProperty({ example: 'XAUUSD', description: 'The symbol of the currency pair' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @ApiProperty({ example: 'Gold vs USD', description: 'The description of the currency pair' })
    @IsString()
    @MaxLength(250)
    description?: string;
}
