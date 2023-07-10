import { IsNotEmpty } from 'class-validator';

export class DrawCardDto {
  @IsNotEmpty()
  playerName: string;

  @IsNotEmpty()
  action: string;
}
