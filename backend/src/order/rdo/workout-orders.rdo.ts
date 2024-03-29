import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { WorkoutRdo } from "src/workout/rdo";

export class WorkoutOrdersDto {
  @ApiProperty({
    description: 'Workout',
  })
  @Expose()
  public workout: WorkoutRdo;

  @ApiProperty({
    description: 'Workout orders count',
    example: '2',
  })
  @Expose()
  public totalCount: number;

  @ApiProperty({
    description: 'Workout sales amount',
    example: '5000',
  })
  @Expose()
  public totalSum: number;
}