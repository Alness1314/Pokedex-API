import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, Length, Max, Min, minLength } from "class-validator";

export class CreatePokemonDto {
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @Min(1)
    @Max(151)
    @ApiProperty()
    no: number;

    @IsString()
    @IsNotEmpty()
    @Length(1, 64)
    @ApiProperty()
    name: string;
}
