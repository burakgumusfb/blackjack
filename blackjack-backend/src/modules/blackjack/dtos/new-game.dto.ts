import { IsNotEmpty, IsNumber } from 'class-validator';

export class NewGameDto {
  @IsNotEmpty()
  playerName: string;

  @IsNotEmpty()
  @IsNumber()
  delay: number;
}
