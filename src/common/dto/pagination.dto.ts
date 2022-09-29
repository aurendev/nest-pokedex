import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";



export class PaginationDTO {

  @IsOptional()
  @IsPositive()
  @Min(1)
  @IsNumber()
  limit?:number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;

}