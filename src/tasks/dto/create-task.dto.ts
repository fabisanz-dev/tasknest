import { IsIn, IsOptional, IsString, IsUUID } from 'class-validator'

enum TaskStatus {
  TODO = 'toDo',
  IN_PROGRESS = 'inProgress',
  DONE = 'done'
}

export class CreateTaskDto {
  @IsString()
  @IsOptional()
  description: string

  @IsIn(['todo', 'inProgress', 'done'])
  @IsOptional()
  status: TaskStatus

  @IsString()
  @IsUUID()
  user: string
}
